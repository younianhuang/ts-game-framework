import { GameStateConfig } from './configuation';
import { GameStateContext } from './context';
import { GameStateEvent } from './event';
import { GameStateMachine, GameStateModule } from '../../src/game-state';
import { SimeGameStateFactory } from './states/simple-game-state';
import { LaunchStateFactory } from './states/launch-state';
import { InitStateFactory } from './states/init-state';
import { PlayStateFactory } from './states/play-state';
import { ShutdownStateFactory } from './states/shutdown-state';

function main(): void {
  const module = new GameStateModule();

  const stateMachine = new GameStateMachine<GameStateContext, GameStateEvent>();

  stateMachine.addGameStateFactory(new LaunchStateFactory());
  stateMachine.addGameStateFactory(new SimeGameStateFactory('MainMenu'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('ChooseGame'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('PlayGame'));
  stateMachine.addGameStateFactory(new InitStateFactory());
  stateMachine.addGameStateFactory(new PlayStateFactory());
  stateMachine.addGameStateFactory(new ShutdownStateFactory());

  stateMachine.configure(GameStateConfig);

  module.addStateMachine(stateMachine);

  console.log('Init GameStateModule');
  module.init();
  // => Launch
  module.tick(20);

  // => Mainmenu.Init
  module.tick(20); // => Mainmenu.Play
  stateMachine.send('Next'); // => ChooseGame

  // => ChooseGame.Init
  module.tick(20); // => ChooseGame.Play
  stateMachine.send('Next'); // => ChooseGame.Shutdown
  module.tick(20); // => PlayGame

  // PlayGame.Init
  module.tick(20); // => PlayGame.Play
  stateMachine.send('Previous'); // => PlayGame.Shutdown
  module.tick(20); // => ChooseGame

  // ChooseGame.Init
  module.tick(20); // => ChooseGame.Play
  stateMachine.send('Previous'); // => ChooseGame.Shutdown
  module.tick(20); // => Menu

  console.log('Shutdown GameStateModule');
  module.destroy();
}

main();
