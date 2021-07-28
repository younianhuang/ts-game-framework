import { createMachine, MachineConfig, interpret, assign, Interpreter, Typestate } from 'xstate';
import { GameStateConfig } from './configuation';
import { GameStateContext } from './context';
import { GameStateEvent } from './events';

import { IGameStateEvent, IGameStateConfig, IGameState, GameStateMachine } from '../../src/game-state';

const gameStateMachine = createMachine<any, GameStateEvent, Typestate<GameStateContext>>(GameStateConfig);

const gameService: Interpreter<GameStateContext, any, GameStateEvent, Typestate<GameStateContext>> = interpret(
  gameStateMachine,
)
  .onTransition(state => {
    if (state.changed) {
      console.log('transit to State: ');
      console.log(state.value);
    }
  })
  .start();
// => 0

gameService.send('Next');
gameService.send('Finished');
gameService.send('Next');
gameService.send('Next');

gameService.stop();

const gsMachine = new GameStateMachine<GameStateContext, GameStateEvent>('SlotGame');
gsMachine.configure(GameStateConfig);
gsMachine.start();
gsMachine.sentEvent('Next');
gsMachine.sentEvent('Finished');
