import { IModule, IModuleProvider } from '../core';
import { IGameStateMachine } from './igame-state-machine';

export class GameStateModule implements IModule {
  private _provider: IModuleProvider | undefined;
  private _gameStateMachines: Array<IGameStateMachine>;

  get name(): string {
    return 'GameState';
  }

  constructor() {
    this._gameStateMachines = new Array<IGameStateMachine>();
  }

  public setProvider(provider: IModuleProvider): void {
    this._provider = provider;
  }

  public getprovider(): IModuleProvider | undefined {
    return this._provider;
  }

  public addStateMachine(machine: IGameStateMachine): void {
    this._gameStateMachines.push(machine);
  }

  init(): void {
    this._gameStateMachines.forEach(machine => {
      machine.start();
    });
  }
  tick(dt: number): void {
    this._gameStateMachines.forEach(machine => {
      machine.update(dt);
    });
  }
  destroy(): void {
    this._gameStateMachines.forEach(machine => {
      machine.stop();
    });
    this._gameStateMachines.length = 0;
  }
}
