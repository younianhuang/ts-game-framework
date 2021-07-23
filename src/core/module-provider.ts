import { Core } from './core';
import { IModule } from './module';

export interface IModuleProvider {
  getModule(moduleName: string): IModule | undefined;
  hasModule(moduleName: string): boolean;
}

export class ModuleProvider implements IModuleProvider {
  private _core: Core;
  constructor(core: Core) {
    this._core = core;
  }
  getModule(moduleName: string): IModule | undefined {
    return this._core.getModule(moduleName);
  }
  hasModule(moduleName: string): boolean {
    return this._core.hasModule(moduleName);
  }
}
