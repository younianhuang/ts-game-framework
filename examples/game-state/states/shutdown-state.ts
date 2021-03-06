import { IGameStateFactory } from '../../../src/game-state';
import { GameStateEvent } from '../event';
import { GameStateContext } from '../context';
import { SimpleGameState } from './simple-game-state';

class ShutdownState extends SimpleGameState {
  public static readonly Name = 'Shutdown';

  private _previousEvent: GameStateEvent | undefined;

  constructor(name: string) {
    super(name);
  }

  entry(context: GameStateContext, event: GameStateEvent): void {
    super.entry(context, event);
    this._previousEvent = event;
  }

  exit(context: GameStateContext, event: GameStateEvent): void {
    super.exit(context, event);
  }

  update(dt: number): void {
    super.update(dt);
    if (this._previousEvent) this.trigger(this._previousEvent);
  }
}

export class ShutdownStateFactory implements IGameStateFactory<GameStateContext, GameStateEvent> {
  name: string;
  constructor() {
    this.name = ShutdownState.Name;
  }
  create(): ShutdownState {
    return new ShutdownState(this.name);
  }
}
