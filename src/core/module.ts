import { IModuleProvider } from './module-provider';
import { INameable } from './nameable';
export interface IModule extends INameable {
  init(): void;
  tick(dt: number): void;
  destroy(): void;
  getprovider(): IModuleProvider | undefined;
  setProvider(provider: IModuleProvider): void;
}
