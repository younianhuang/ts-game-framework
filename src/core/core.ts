import { IModule } from './module';
import { ModuleProvider } from './module-provider';
import { Log, Logger, ConsoleAppender } from '../log';

export class Core {
  private static _instance: Core;
  private readonly _provider: ModuleProvider;
  private readonly _allModules: Map<string, IModule>;
  private _logger: Logger | undefined | null;

  constructor() {
    this._provider = new ModuleProvider(this);
    this._allModules = new Map<string, IModule>();
    this._logger = null;
  }

  public static getCore(): Core {
    if (!this._instance) {
      this._instance = new Core();
    }

    return this._instance;
  }

  public init(): void {
    if (!Log.hasLogger('core')) {
      this._createDefaultLogger();

      this._logger = Log.getLogger('core');
    }

    this._logger?.info('Core initialize');

    this._allModules.forEach((module: IModule) => {
      module.init();
    });
  }

  public tick(dt: number): void {
    this._allModules.forEach((module: IModule) => {
      module.tick(dt);
    });
  }

  public destroy(): void {
    this._allModules.forEach((module: IModule) => {
      module.destroy();
    });

    this._logger?.info('Core destroy');

    Log.dispose();
  }

  public addModule(moduleName: string, module: IModule): void {
    //const moduleName: string = module.constructor.name;

    if (this.hasModule(moduleName)) {
      console.warn('This module already exists! : ' + moduleName);
      return;
    }

    module.setProvider(this._provider);

    this._allModules.set(moduleName, module);
  }

  public removeModule(moduleName: string): void {
    if (!this.hasModule(moduleName)) {
      return;
    }

    this._allModules.delete(moduleName);
  }

  public getModule(moduleName: string): IModule | undefined {
    if (!this.hasModule(moduleName)) {
      return undefined;
    }

    return this._allModules.get(moduleName);
  }

  public hasModule(moduleName: string): boolean {
    return this._allModules.has(moduleName);
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

    Log.registerAppender(ConsoleAppender.type, ConsoleAppender.create);
    Log.configure(configuration);
  }
}
