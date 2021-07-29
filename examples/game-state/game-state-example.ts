import { GameStateConfig } from './configuation';
import { GameStateContext } from './context';
import { GameStateEvent } from './events';
import { IGameState, IGameStateFactory, GameStateMachine, GameEvent, GameStateModule } from '../../src/game-state';
import { SimeGameStateFactory } from './states/simple-game-state';

function main(): void {
  const module = new GameStateModule();

  const stateMachine = new GameStateMachine<GameStateContext, GameStateEvent>();

  stateMachine.addGameStateFactory(new SimeGameStateFactory('Launch'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('MainMenu'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('ChooseGame'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('PlayGame'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('Init'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('Play'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('Shutdown'));

  stateMachine.configure(GameStateConfig);

  module.addStateMachine(stateMachine);

  module.init();

  stateMachine.send('Next');

  module.tick(0);

  //module.destroy();
  //stateMachine.start();
  //stateMachine.send('Next');
  //stateMachine.send('Finished');

  //stateMachine.stop();
}

main();
