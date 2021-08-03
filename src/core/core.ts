import { IModule } from './module';
import { IModuleProvider } from './module-provider';
import { log, Logger, ConsoleAppender } from '../log';
import { GameFrameworkError } from '../util';

export class Core implements IModuleProvider {
  private readonly _modules: Map<string, IModule>;
  private _logger: Logger | undefined | null;

  constructor() {
    this._modules = new Map<string, IModule>();
    this._logger = null;
  }

  public init(): void {
    if (!log.hasLogger('core')) {
      this._createDefaultLogger();

      this._logger = log.getLogger('core');
    }

    this._logger?.info('Core initialize');

    this._modules.forEach((module: IModule) => {
      module.init();
    });
  }

  public tick(dt: number): void {
    this._modules.forEach((module: IModule) => {
      module.tick(dt);
    });
  }

  public destroy(): void {
    this._modules.forEach((module: IModule) => {
      module.destroy();
    });

    this._logger?.info('Core destroy');

    log.dispose();
  }

  public addModule(module: IModule): void {
    if (this.hasModule(module.name)) {
      throw new GameFrameworkError('Module ' + module.name + ' already exists!');
    }

    module.setProvider(this);

    this._modules.set(module.name, module);
  }

  public removeModule(moduleName: string): void {
    if (!this.hasModule(moduleName)) {
      throw new GameFrameworkError('Module ' + moduleName + ' does not exists!');
    }

    this._modules.delete(moduleName);
  }

  public getModule(moduleName: string): IModule {
    if (!this.hasModule(moduleName)) {
      throw new GameFrameworkError('Module ' + moduleName + ' does not already exists!');
    }

    return this._modules.get(moduleName) as IModule;
  }

  public hasModule(moduleName: string): boolean {
    return this._modules.has(moduleName);
  }

  private _createDefaultLogger(): void {
    const configuration = {
      appenderes: {
        console: { type: 'console' },
      },
      categories: {
        core: { appenders: ['console'] },
      },
    };

    log.registerAppender(ConsoleAppender.type, ConsoleAppender.create);
    log.configure(configuration);
  }
}

export const core = new Core();
