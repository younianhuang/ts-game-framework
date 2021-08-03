import { core, IModule, IModuleProvider, BeforeInitEvent } from '../core';
import { GameFrameworkError } from '../util';

type ModuleNames = 'test1' | 'test2';

abstract class BaseModule implements IModule {
  private _isInitialized = false;
  private _provider: IModuleProvider | undefined;

  abstract get name(): string;

  public setProvider(provider: IModuleProvider): void {
    this._provider = provider;
  }

  public getprovider(): IModuleProvider | undefined {
    return this._provider;
  }

  init(): void {
    this._isInitialized = true;
  }

  public isInitialized(): boolean {
    return this._isInitialized;
  }

  abstract tick(dt: number): void;
  abstract destroy(): void;
}

class TestModule1 extends BaseModule {
  public isBeforeInitDone: boolean = false;

  get name(): string {
    return 'test1';
  }

  init(): void {
    super.init();
  }
  tick(dt: number): void {}
  destroy(): void {}
}

class TestModule2 extends BaseModule {
  get name(): string {
    return 'test2';
  }
  init(): void {
    super.init();
  }
  tick(dt: number): void {}
  destroy(): void {}
}

test('test game framework core', () => {
  expect(core.hasModule('test1')).toBeFalsy();
  expect(core.hasModule('test2')).toBeFalsy();

  const testModule1 = new TestModule1();
  const testModule2 = new TestModule2();

  core.addModule(testModule1);
  core.addModule(testModule2);
  expect(core.hasModule('test1')).toBeTruthy();
  expect(core.hasModule('test2')).toBeTruthy();

  expect(() => {
    core.addModule(new TestModule2());
  }).toThrow(GameFrameworkError);

  expect(core.getModule('test1') as TestModule1).toEqual(testModule1);
  expect(core.getModule('test2') as TestModule2).toEqual(testModule2);

  core.subscribe(event => {
    if (event.name === BeforeInitEvent.Name) {
      testModule1.isBeforeInitDone = true;
    }
  });

  core.init();

  expect(testModule1.isInitialized()).toBeTruthy();
  expect(testModule2.isInitialized()).toBeTruthy();
  expect(testModule1.isBeforeInitDone).toBeTruthy();

  expect(testModule1.getprovider()).toEqual(core);
  expect(testModule2.getprovider()).toEqual(core);

  core.removeModule('test2');
  expect(core.hasModule('test2')).toBeFalsy();
});
