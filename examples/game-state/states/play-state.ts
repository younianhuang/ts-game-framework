import { IGameStateFactory } from '../../../src/game-state';
import { GameStateEvent } from '../event';
import { GameStateContext } from '../context';
import { SimpleGameState } from './simple-game-state';

class PlayState extends SimpleGameState {
  public static readonly Name = 'Play';

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
    this.trigger('Finished');
  }
}

export class PlayStateFactory implements IGameStateFactory<GameStateContext, GameStateEvent> {
  name: string;
  constructor() {
    this.name = PlayState.Name;
  }
  create(): PlayState {
    return new PlayState(this.name);
  }
}
