import { Levels } from '../level';
import { IAppenderConfiguration } from '../configuration';
export interface IAppender {
  type: string;
  log(logLevel: Levels, message?: unknown, ...optionalParams: unknown[]): void;
  configure(config: IAppenderConfiguration): void;
  dispose(): void;
}

export abstract class AppenderBase implements IAppender {
  private _type: string;

  public get type(): string {
    return this._type;
  }

  constructor(type: string) {
    this._type = type;
  }

  abstract log(logLevel: Levels, message?: unknown, ...optionalParams: unknown[]): void;

  configure(config: IAppenderConfiguration): void {}

  dispose(): void {}
}
