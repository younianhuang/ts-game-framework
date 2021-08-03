/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGameState, IGameStateFactory } from './game-state';
import { IGameStateConfig, IGameStateEvent, GameEvent } from './game-state-configuration';
import { GameFrameworkError } from '../util/game-framewrok-error';
import { createMachine, interpret, Interpreter, Typestate, State, StatesConfig, StateNodeConfig } from 'xstate';

export class GameStateMachine<TContext, TEvent extends IGameStateEvent> {
  private _id: string;
  private _gameStateFactories: Map<string, IGameStateFactory<TContext, TEvent>>;
  private _gameStates: Map<string, IGameState<TContext, TEvent>>;
  private _service: Interpreter<TContext, any, TEvent, Typestate<TContext>> | undefined;
  private _currentGameState: IGameState<TContext, TEvent> | undefined;
  private _currentStateFullName: string | undefined;
  private _context: TContext | undefined;

  constructor() {
    this._id = '';
    this._gameStateFactories = new Map<string, IGameStateFactory<TContext, TEvent>>();
    this._gameStates = new Map<string, IGameState<TContext, TEvent>>();
  }

  public get id(): string {
    return this._id;
  }

  public addGameStateFactory(factory: IGameStateFactory<TContext, TEvent>): void {
    if (this._gameStateFactories.has(factory.name)) {
      throw new GameFrameworkError('Factory ' + factory.name + ' already exists!');
    }
    this._gameStateFactories.set(factory.name, factory);
  }

  public configure(config: IGameStateConfig<any, TEvent>): void {
    if (!config.id) {
      throw new GameFrameworkError('config must have "id" field.');
    }
    this._id = config.id;

    this._createGameStates(config.states);

    const machine = createMachine(config);

    this._context = machine.context;

    this._service = interpret(machine).onTransition(this._onTransition.bind(this));
  }

  public start(): void {
    this._service?.start();
  }

  public stop(): void {
    this._service?.stop();
  }

  public send(event: GameEvent<TEvent>): void {
    this._service?.send(event);
  }

  public update(dt: number): void {
    this._currentGameState?.update?.(dt);
  }

  public getCurrentStateFullName(): string | undefined {
    return this._currentStateFullName;
  }

  public getContext(): TContext | undefined {
    return this._context;
  }

  private _onTransition(
    state: State<TContext, IGameStateEvent, any, Typestate<TContext>>,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    event: IGameStateEvent,
  ): void {
    const names = state.toStrings();
    this._currentStateFullName = names[names.length - 1];

    this._currentGameState = this._gameStates.get(this._currentStateFullName);
  }

  private _createGameStates(statesConfig: StatesConfig<TContext, any, TEvent> | undefined, parentName = '') {
    if (!statesConfig) return;

    Object.keys(statesConfig).forEach(key => {
      const factory = this._gameStateFactories.get(key);
      if (factory) {
        const gameState = factory.create();

        const stateConfig = statesConfig[key];

        this._bindGameStateActions(stateConfig, gameState);

        const stateName = parentName.length > 0 ? parentName.concat('.', key) : key;

        this._gameStates.set(stateName, gameState);

        // create sub states
        this._createGameStates(stateConfig.states, stateName);
      }
    });
  }
  private _bindGameStateActions(
    stateConfig: StateNodeConfig<TContext, any, TEvent>,
    gameState: IGameState<TContext, TEvent>,
  ) {
    // bind actions
    if (gameState.entry) stateConfig.entry = gameState.entry.bind(gameState);
    if (gameState.exit) stateConfig.exit = gameState.exit.bind(gameState);
    gameState.send = this.send.bind(this);
  }
}
