export interface IGameState {
  type: string;
  entry?(): void;
  exit?(): void;
  update?(dt: number): void;
}
