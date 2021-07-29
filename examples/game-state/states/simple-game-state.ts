import { IGameState, IGameStateFactory } from '../../../src/game-state';
import { GameStateEvent } from '../events';
import { GameStateContext } from '../context';

class SimpleGameState implements IGameState<GameStateContext, GameStateEvent> {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  entry(context: GameStateContext, event: GameStateEvent): void {
    console.log(event.type + ' => ' + this._name + ' entry');
  }

  exit(context: GameStateContext, event: GameStateEvent): void {
    console.log(event.type + ' => ' + this._name + ' exit');
  }

  update(dt: number): void {
    console.log('State ' + this._name + ' update');
  }
  //send: ((event: GameEvent<GameStateEvent>) => void) | undefined;
}

export class SimeGameStateFactory implements IGameStateFactory<GameStateContext, GameStateEvent> {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  create(): SimpleGameState {
    return new SimpleGameState(this.name);
  }
}
