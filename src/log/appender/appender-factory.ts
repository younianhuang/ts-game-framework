import { IAppender } from './appender';

export interface IAppenderFactory {
  type: string;
  create(): IAppender;
}
