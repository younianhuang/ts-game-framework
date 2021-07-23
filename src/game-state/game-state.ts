export interface IGameState {
  name: string;
  entry(): void;
  exit(): void;
  update(dt: number): void;
}
