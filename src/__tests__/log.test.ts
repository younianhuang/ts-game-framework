import { log, IAppender, ConsoleAppender, Levels, Logger } from '../log';
import { AppenderBase } from '../log/appender/appender';

class StringAppender extends AppenderBase {
  public value: string;

  constructor(type: string) {
    super(type);
    this.value = '';
  }

  log(logLevel: Levels, message?: unknown, ...optionalParams: unknown[]): void {
    this.value = message as string;
  }

  dispose(): void {
    this.value = 'disposed';
  }

  public static create(type: string): IAppender {
    return new StringAppender(type);
  }
}

test('test game framework log system', () => {
  const configuration = {
    appenderes: {
      console: { type: 'console' },
      string: { type: 'string' },
    },
    categories: {
      global: { appenders: ['string'] },
      network: { appenders: ['string'], level: 'error' },
      domain: { appenders: ['string'], level: 'fatal' },
      ui: { appenders: ['string'], level: 'trace' },
    },
    level: 'info',
  };

  /// register appenders
  log.registerAppender('console', ConsoleAppender.create);
  log.registerAppender('string', StringAppender.create);

  expect(() => {
    log.registerAppender('test', null!);
  }).toThrow();

  expect(() => {
    log.registerAppender('console', ConsoleAppender.create);
  }).toThrow();

  /// config loggers
  log.configure(configuration);

  const global = log.getLogger('global') as Logger;
  const network = log.getLogger('network') as Logger;
  const domain = log.getLogger('domain') as Logger;
  const ui = log.getLogger('ui') as Logger;

  const globalAppender = global.getAppender('string') as StringAppender;
  const networkAppender = network.getAppender('string') as StringAppender;
  const domainAppender = domain.getAppender('string') as StringAppender;
  const uiAppender = ui.getAppender('string') as StringAppender;

  /// test log level
  expect(global.level).toEqual(Levels.info);
  expect(network.level).toEqual(Levels.error);
  expect(domain.level).toEqual(Levels.fatal);
  expect(ui.level).toEqual(Levels.trace);

  global.trace('trace');
  expect(globalAppender.value).toEqual('');
  global.debug('debug');
  expect(globalAppender.value).toEqual('');
  global.info('info');
  expect(globalAppender.value).toEqual('info');
  global.warn('warn');
  expect(globalAppender.value).toEqual('warn');
  global.error('error');
  expect(globalAppender.value).toEqual('error');
  global.fatal('fatal');
  expect(globalAppender.value).toEqual('fatal');

  /// test category with diffent level of logs
  globalAppender.value = '';

  global.log(Levels.trace, 'trace');
  network.log(Levels.trace, 'trace');
  domain.log(Levels.trace, 'trace');
  ui.log(Levels.trace, 'trace');
  expect(globalAppender.value).toEqual('');
  expect(networkAppender.value).toEqual('');
  expect(domainAppender.value).toEqual('');
  expect(uiAppender.value).toEqual('trace');

  global.log(Levels.info, 'info');
  network.log(Levels.info, 'info');
  domain.log(Levels.info, 'info');
  ui.log(Levels.info, 'info');
  expect(globalAppender.value).toEqual('info');
  expect(networkAppender.value).toEqual('');
  expect(domainAppender.value).toEqual('');
  expect(uiAppender.value).toEqual('info');

  global.fatal('fatal');
  network.fatal('fatal');
  domain.fatal('fatal');
  ui.fatal('fatal');
  expect(globalAppender.value).toEqual('fatal');
  expect(networkAppender.value).toEqual('fatal');
  expect(domainAppender.value).toEqual('fatal');
  expect(uiAppender.value).toEqual('fatal');

  /// test enbale/ disable
  global.enable = false;
  global.log(Levels.fatal, 'disable');
  expect(globalAppender.value).toEqual('fatal');
  global.enable = true;
  global.log(Levels.fatal, 'enalbe');
  expect(globalAppender.value).toEqual('enalbe');

  log.enble = false;
  expect(global.enable).toEqual(false);
  expect(network.enable).toEqual(false);
  expect(domain.enable).toEqual(false);
  expect(ui.enable).toEqual(false);

  log.enble = true;
  expect(global.enable).toEqual(true);
  expect(network.enable).toEqual(true);
  expect(domain.enable).toEqual(true);
  expect(ui.enable).toEqual(true);

  log.dispose();
  expect(globalAppender.value).toEqual('disposed');
  expect(networkAppender.value).toEqual('disposed');
  expect(domainAppender.value).toEqual('disposed');
  expect(uiAppender.value).toEqual('disposed');
});
