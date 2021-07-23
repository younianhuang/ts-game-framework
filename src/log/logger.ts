import { Levels } from './level';
import { IAppender } from './appender/appender';
import { GameFrameworkError } from '../util';

export class Logger {
  private _category: string;
  private _level: Levels;
  private _enable: boolean;
  private _appenders: Map<string, IAppender>;

  constructor(category: string) {
    this._category = category;
    this._level = Levels.info;
    this._enable = true;
    this._appenders = new Map<string, IAppender>();
  }

  public set level(level: Levels) {
    this._level = level;
  }

  public get level(): Levels {
    return this._level;
  }

  public set enable(enable: boolean) {
    this._enable = enable;
  }

  public get enable(): boolean {
    return this._enable;
  }

  public get category(): string {
    return this._category;
  }

  public dispose(): void {
    this._appenders.forEach(appender => {
      appender.dispose();
    });
  }

  public log(logLevel: Levels, message?: unknown, ...optionalParams: unknown[]): void {
    if (this.enable && logLevel >= this._level) {
      this._appenders.forEach(appender => {
        appender.log(logLevel, message, optionalParams);
      });
    }
  }

  public trace(message: unknown, ...optionalParams: unknown[]): void {
    this.log(Levels.trace, message, optionalParams);
  }

  public debug(message: unknown, ...optionalParams: unknown[]): void {
    this.log(Levels.debug, message, optionalParams);
  }

  public info(message: unknown, ...optionalParams: unknown[]): void {
    this.log(Levels.info, message, optionalParams);
  }

  public warn(message: unknown, ...optionalParams: unknown[]): void {
    this.log(Levels.warn, message, optionalParams);
  }

  public error(message: unknown, ...optionalParams: unknown[]): void {
    this.log(Levels.error, message, optionalParams);
  }

  public fatal(message: unknown, ...optionalParams: unknown[]): void {
    this.log(Levels.fatal, message, optionalParams);
  }

  public addAppender(appender: IAppender): void {
    this._appenders.set(appender.type, appender);
  }

  public hasAppender(type: string): boolean {
    return this._appenders.has(type);
  }

  public getAppender(type: string): IAppender {
    const appender = this._appenders.get(type);

    if (!appender) {
      throw new GameFrameworkError('Appender ' + type + ' does not exist.');
    }

    return appender as IAppender;
  }

  //public removeAppender(type: string) {}
}
