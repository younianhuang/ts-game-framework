import { createMachine, MachineConfig, interpret, assign, Interpreter, Typestate, Machine } from 'xstate';
import { GameStateConfig } from './configuation';
import { GameStateContext } from './context';
import { GameStateEvent } from './events';

import { IGameState, IGameStateFactory, GameStateMachine, GameEvent } from '../../src/game-state';

class SimpleGameState implements IGameState<GameStateContext, GameStateEvent> {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  entry(context: GameStateContext, event: GameStateEvent): void {
    console.log(event.type + ' => ' + this._name + ' entry');

    //this.send?.('Next');
  }

  exit(context: GameStateContext, event: GameStateEvent): void {
    console.log(event.type + ' => ' + this._name + ' exit');
  }

  update(dt: number): void {
    console.log('State ' + this._name + ' update');
  }

  send: ((event: GameEvent<GameStateEvent>) => void) | undefined;
}

class SimeGameStateFactory implements IGameStateFactory<GameStateContext, GameStateEvent> {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  create(): SimpleGameState {
    return new SimpleGameState(this.name);
  }
}

function main(): void {
  const stateMachine = new GameStateMachine<GameStateContext, GameStateEvent>();

  stateMachine.addGameStateFactory(new SimeGameStateFactory('Launch'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('MainMenu'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('ChooseGame'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('PlayGame'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('Init'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('Play'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('Shutdown'));

  stateMachine.configure(GameStateConfig);
  stateMachine.start();
  stateMachine.send('Next');
  stateMachine.send('Finished');

  stateMachine.stop();
}

main();
