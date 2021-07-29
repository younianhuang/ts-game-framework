import { IGameStateEvent, GameEvent } from './game-state-configuration';
export interface IGameState<TContext, TEvent extends IGameStateEvent> {
  entry?(context: TContext, event: TEvent): void;
  exit?(context: TContext, event: TEvent): void;
  update?(dt: number): void;
  send?(event: GameEvent<TEvent>): void;
}

export interface IGameStateFactory<TContext, TEvent extends IGameStateEvent> {
  name: string;
  create(): IGameState<TContext, TEvent>;
}
