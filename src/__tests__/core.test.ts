import { Core, BaseModule } from '../core';

class TestModule1 extends BaseModule {
  private _isInitialized = false;
  init(): void {
    this._isInitialized = true;
  }
  tick(dt: number): void {}
  destroy(): void {}
  public isInitialized(): boolean {
    return this._isInitialized;
  }
}

class TestModule2 extends BaseModule {
  init(): void {}
  tick(dt: number): void {}
  destroy(): void {}
}

test('test game framework core', () => {
  const core: Core = Core.getCore();
  expect(core.hasModule('test1')).toEqual(false);
  expect(core.hasModule('test2')).toEqual(false);
  core.addModule('test1', new TestModule1());
  core.addModule('test2', new TestModule2());
  expect(core.hasModule('test1')).toEqual(true);
  expect(core.hasModule('test2')).toEqual(true);
  core.init();
  expect((core.getModule('test1') as TestModule1).isInitialized()).toEqual(true);
  core.removeModule('test2');
  expect(core.hasModule('test2')).toEqual(false);
});
