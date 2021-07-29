export interface IGameStateMachine {
  start(): void;

  stop(): void;

  update(dt: number): void;
}
