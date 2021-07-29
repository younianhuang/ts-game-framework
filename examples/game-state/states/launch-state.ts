import { IGameStateFactory } from '../../../src/game-state';
import { GameStateEvent } from '../event';
import { GameStateContext } from '../context';
import { SimpleGameState } from './simple-game-state';

class LaunchState extends SimpleGameState {
  public static readonly Name = 'Launch';

  constructor(name: string) {
    super(name);
  }

  entry(context: GameStateContext, event: GameStateEvent): void {
    super.entry(context, event);
  }

  exit(context: GameStateContext, event: GameStateEvent): void {
    super.exit(context, event);
  }

  update(dt: number): void {
    super.update(dt);

    this.trigger('Next');
  }
}

export class LaunchStateFactory implements IGameStateFactory<GameStateContext, GameStateEvent> {
  name: string;
  constructor() {
    this.name = LaunchState.Name;
  }
  create(): LaunchState {
    return new LaunchState(this.name);
  }
}
