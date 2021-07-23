export interface IAppenderConfiguration {
  type: string;
}

export interface ILoggerConfiguration {
  appenders: string[];
  level?: string;
}

export interface IConfiguration {
  appenderes: { [name: string]: IAppenderConfiguration };
  categories: { [name: string]: ILoggerConfiguration };
  level?: string;
}
