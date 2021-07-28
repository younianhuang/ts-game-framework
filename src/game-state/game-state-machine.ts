import { IGameState } from './game-state';
import { IGameStateConfig, IGameStateEvent } from './game-state-configuration';
import { GameFrameworkError } from '../util/game-framewrok-error';
import { createMachine, Event, interpret, Interpreter, Typestate, State, MachineConfig, AnyEventObject } from 'xstate';

export class GameStateMachine<TContext, TEvent extends IGameStateEvent> {
  private _id: string;
  private _gameStates: Map<string, IGameState>;
  private _service: Interpreter<TContext, any, TEvent, Typestate<TContext>> | undefined;

  constructor(id: string) {
    this._id = id;
    this._gameStates = new Map<string, IGameState>();
  }
  public addState(state: IGameState): void {
    if (this._gameStates.has(state.type)) {
      throw new GameFrameworkError('state ' + state.type + ' already exists.');
    }
    this._gameStates.set(state.type, state);
  }

  /*
  public configure(config: IGameStateConfig<any, TEvent>): void {
    const machine = createMachine<TContext, TEvent>(config);
    this._service = interpret(machine).onTransition(this._onTransition.bind(this));
  }
*/
  public configure(config: IGameStateConfig<any, TEvent>): void {
    const machine = createMachine(config);
    //this._service = interpret(machine);
    //const machine = createMachine<TContext, TEvent, Typestate<TContext>>(config);
    this._service = interpret(machine).onTransition(this._onTransition.bind(this));
  }

  public start(): void {
    this._service?.start();
  }

  public sentEvent(event: Event<TEvent>): void {
    this._service?.send(event);
  }

  private _onTransition(
    state: State<TContext, IGameStateEvent, any, Typestate<TContext>>,
    event: IGameStateEvent,
  ): void {
    console.log(state.value);
  }
}
