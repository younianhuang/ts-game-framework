import { Logger } from './logger';
import { IConfiguration, IAppenderConfiguration, ILoggerConfiguration } from './configuration';
import { Levels } from './level';
import { IAppender } from './appender/appender';
import { GameFrameworkError } from '../util/game-framewrok-error';

type AppenderCreator = (type: string) => IAppender;

class Log {
  private _defaultLevel: Levels;
  private readonly _loggers: Map<string, Logger>;
  private readonly _appenderCreators: Map<string, AppenderCreator>;
  private _enable: boolean;

  constructor() {
    this._defaultLevel = Levels.info;
    this._loggers = new Map<string, Logger>();
    this._appenderCreators = new Map<string, AppenderCreator>();
    this._enable = true;
  }

  public registerAppender(type: string, creator: AppenderCreator): void {
    if (!creator) {
      throw new GameFrameworkError('Parameter creator cannot be null or undefined.');
    }

    if (this._appenderCreators.has(type)) {
      throw new GameFrameworkError('appender ' + type + ' has already registered.');
    }

    this._appenderCreators.set(type, creator);
  }

  public configure(config: IConfiguration): void {
    this._enable = true;

    if (config.level) {
      const lv: string = <string>config.level;
      Levels[lv];
      this._defaultLevel = Levels[config.level];
    }

    Object.keys(config.categories).forEach(category => {
      this.createLogger(category, config.appenderes, config.categories[category]);
    });
  }

  private _createAppender(config: IAppenderConfiguration): IAppender {
    const creator = this._appenderCreators.get(config.type);
    if (!creator) {
      throw new GameFrameworkError('Appender ' + config.type + ' does not exits.');
    }
    const appender = creator(config.type);
    appender.configure(config);
    return appender;
  }

  public createLogger(
    category: string,
    appenderConfigs: { [name: string]: IAppenderConfiguration },
    loggerConfig: ILoggerConfiguration,
  ): void {
    const logger = new Logger(category);
    logger.level = loggerConfig.level ? Levels[loggerConfig.level] : this._defaultLevel;

    /// create appenders
    loggerConfig.appenders.forEach(appenderName => {
      const appender = this._createAppender(appenderConfigs[appenderName]);
      logger.addAppender(appender);
    });

    this._loggers.set(category, logger);
  }

  public hasLogger(category: string): boolean {
    return this._loggers.has(category);
  }

  public getLogger(category: string): Logger {
    const logger = this._loggers.get(category);
    if (!logger) {
      throw new GameFrameworkError('Logger ' + category + ' does not exist.');
    }

    return logger;
  }

  public get enable(): boolean {
    return this._enable;
  }

  public set enble(enable: boolean) {
    this._enable = enable;
    this._loggers.forEach(logger => {
      logger.enable = enable;
    });
  }

  public dispose(): void {
    this._loggers.forEach(logger => {
      logger.dispose();
    });
  }
}

export const log = new Log();
