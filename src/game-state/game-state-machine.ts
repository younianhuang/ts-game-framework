import { IGameState } from './game-state';
import { IGameStateConfig, IGameStateSchema, IGameStateEvent, IGameStateContext } from './game-state-configuration';
import { GameFrameworkError } from '../util/game-framewrok-error';
import { createMachine, interpret, Interpreter, Typestate, State } from 'xstate';

export class GameStateMachine {
  private _id: string;
  private _gameStates: Map<string, IGameState>;
  private _service:
    | Interpreter<IGameStateContext, IGameStateSchema, IGameStateEvent, Typestate<IGameStateContext>>
    | undefined;

  constructor(id: string) {
    this._id = id;
    this._gameStates = new Map<string, IGameState>();
  }
  public addState(state: IGameState): void {
    if (this._gameStates.has(state.name)) {
      throw new GameFrameworkError('state ' + state.name + ' already exists.');
    }
    this._gameStates.set(state.name, state);
  }

  public configure(config: IGameStateConfig): void {
    const machine = createMachine(config);
    this._service = interpret(machine).onTransition(this._onTransition.bind(this));
  }

  public start(): void {
    this._service?.start();
  }

  private _onTransition(
    state: State<IGameStateContext, IGameStateEvent, IGameStateSchema, Typestate<IGameStateContext>>,
    event: IGameStateEvent,
  ): void {}
}
