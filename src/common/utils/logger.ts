import { addColors, createLogger, format, Logger as WinstonLoggerType, transports } from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import emoji from 'node-emoji';
import { environment } from '@/common/config/environment';

export interface ILogger {
  silly(value: string | unknown): void;
  debug(value: string | unknown): void;
  verbose(value: string | unknown): void;
  http(value: string | unknown): void;
  info(value: string | unknown): void;
  warn(value: string | unknown): void;
  error(value: string | unknown): void;
  error(value: string | Error | unknown): void;
}

enum LevelName {
  SILLY = 'silly',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
  HTTP = 'http',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

const LEVEL_SEVERITY = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const LEVEL_COLOR = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'grey',
  debug: 'white',
  silly: 'cyan',
};

const DEFAULT_FORMAT = format.combine(
  format.errors({ stack: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
  format.printf((info) =>
    `[${info.timestamp}] ${info.level.toLocaleUpperCase()} ${info.message} ${
      info.stack || ''
    }`.trim(),
  ),
);

const CONSOLE_FORMAT = format.combine(
  format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
  format.errors({ stack: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
  format.colorize({ all: true }),
  format.printf((info) =>
    `[${info.timestamp}] ${info.level} ${info.message} ${info.stack || ''}`.trim(),
  ),
);

class Logger implements ILogger {
  private readonly logLevel: string = environment.isDevelopment ? LevelName.DEBUG : LevelName.INFO;
  private readonly logger: WinstonLoggerType;

  constructor() {
    this.logger = this.configureAndGetLogger();
  }

  silly(value: string | unknown): void {
    this.logger.silly(`${emoji.get('unicorn_face')} ${this.getValue(value)}`);
  }

  debug(value: unknown): void {
    this.logger.debug(`${emoji.get('video_game')} ${this.getValue(value)}`);
  }
  verbose(value: unknown): void {
    this.logger.verbose(`${emoji.get('eye-in-speech-bubble')} ${this.getValue(value)}`);
  }
  http(value: unknown): void {
    this.logger.http(`${emoji.get('computer')} ${this.getValue(value)}`);
  }
  info(value: unknown): void {
    this.logger.info(`${emoji.get('bulb')} ${this.getValue(value)}`);
  }
  warn(value: unknown): void {
    this.logger.warn(`${emoji.get('loudspeaker')} ${this.getValue(value)}`);
  }
  error(value: string | Error | unknown): void {
    if (value instanceof Error) {
      this.logger.error(emoji.get('x'), value);
    } else {
      this.logger.error(`${emoji.get('x')} ${this.getValue(value)}`);
    }
  }

  private configureAndGetLogger(): WinstonLoggerType {
    addColors(LEVEL_COLOR);

    const logsFolder = this.logDirectory();

    const transportsList = [
      new transports.Console({
        level: this.logLevel,
        handleExceptions: true,
        format: CONSOLE_FORMAT,
      }),
      new transports.File({
        filename: `${logsFolder}/error.log`,
        level: LevelName.ERROR,
        handleExceptions: true,
        maxsize: 5_242_880, // 5MB
        maxFiles: 1,
      }),
      new DailyRotateFile({
        filename: `${logsFolder}/all-%DATE%.log`,
        level: this.logLevel,
        handleExceptions: true,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
      }),
    ];
    return createLogger({
      level: this.logLevel,
      levels: LEVEL_SEVERITY,
      format: DEFAULT_FORMAT,
      transports: transportsList,
      exitOnError: false,
      handleExceptions: true,
    });
  }
  private getValue = (value: string | unknown): string => {
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  };
  private logDirectory() {
    let dir = environment.logDirectory;
    if (!dir) dir = path.resolve('logs');

    if (!fs.existsSync(dir)) {
      // Create directory if not exists
      fs.mkdirSync(dir);
    }
    return dir;
  }
}

export const logger = new Logger();
