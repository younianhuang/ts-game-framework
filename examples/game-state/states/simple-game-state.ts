import { IGameState, IGameStateFactory, GameEvent } from '../../../src/game-state';
import { GameStateEvent } from '../event';
import { GameStateContext } from '../context';

export class SimpleGameState implements IGameState<GameStateContext, GameStateEvent> {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  entry(context: GameStateContext, event: GameStateEvent): void {
    context.previousEntryState = this._name;
    //console.log(this._name + '.entry');
  }

  exit(context: GameStateContext, event: GameStateEvent): void {
    context.previouseExitState = this._name;
    //console.log(this._name + '.exit');
  }

  update(dt: number): void {
    //console.log(this._name + '.update');
  }

  send: ((event: GameEvent<GameStateEvent>) => void) | undefined;

  trigger(event: GameEvent<GameStateEvent>): void {
    //console.log('trigger event =>');
    //console.log(event);
    this.send?.(event);
  }
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
