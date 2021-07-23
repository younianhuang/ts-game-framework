import { IModuleProvider } from './module-provider';

export interface IModule {
  init(): void;
  tick(dt: number): void;
  destroy(): void;
  getprovider(): void;
  setProvider(provider: IModuleProvider): void;
}

export abstract class BaseModule implements IModule {
  protected _provider: IModuleProvider | undefined;
  public setProvider(provider: IModuleProvider): void {
    this._provider = provider;
  }
  abstract init(): void;
  abstract tick(dt: number): void;
  abstract destroy(): void;

  public getprovider(): IModuleProvider | undefined {
    return this._provider;
  }
}
