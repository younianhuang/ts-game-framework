import { Levels } from '../../level';
import { IAppender, AppenderBase } from '../appender';
export class ConsoleAppender extends AppenderBase {
  private static readonly _type = 'console';

  public static get type(): string {
    return ConsoleAppender._type;
  }

  constructor(type: string) {
    super(type);
  }

  public log(logLevel: Levels, message?: unknown, ...optionalParams: unknown[]): void {
    console.log(message, optionalParams);
  }

  public static create(type: string): IAppender {
    return new ConsoleAppender(type);
  }
}
