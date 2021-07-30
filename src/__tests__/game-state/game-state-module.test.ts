import { GameStateMachine, GameStateModule } from '../../game-state';
import {
  GameStateConfig,
  GameStateContext,
  GameStateEvent,
  SimeGameStateFactory,
  LaunchStateFactory,
  InitStateFactory,
  PlayStateFactory,
  ShutdownStateFactory,
} from '../../../examples/game-state';

function createStateMachine(): GameStateMachine<GameStateContext, GameStateEvent> {
  const stateMachine = new GameStateMachine<GameStateContext, GameStateEvent>();

  stateMachine.addGameStateFactory(new LaunchStateFactory());
  stateMachine.addGameStateFactory(new SimeGameStateFactory('MainMenu'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('ChooseGame'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('PlayGame'));
  stateMachine.addGameStateFactory(new InitStateFactory());
  stateMachine.addGameStateFactory(new PlayStateFactory());
  stateMachine.addGameStateFactory(new ShutdownStateFactory());

  stateMachine.configure(GameStateConfig);

  return stateMachine;
}

test('test GameStateMachine', () => {
  const module = new GameStateModule();

  const stateMachine = createStateMachine();
  const stateMachine2 = createStateMachine();

  const contex = stateMachine.getContext() as GameStateContext;

  expect(stateMachine.id).toEqual('SlotGame');
  expect(stateMachine.getCurrentStateFullName()).toBeUndefined();

  module.addStateMachine(stateMachine);
  module.addStateMachine(stateMachine2);
  module.init();
  expect(stateMachine.getCurrentStateFullName()).toEqual('Launch');
  expect(stateMachine2.getCurrentStateFullName()).toEqual('Launch');
  expect(contex.previousEntryState).toEqual('Launch');

  module.tick(20); //=> MainMenu => MainMenu.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Init');
  expect(stateMachine2.getCurrentStateFullName()).toEqual('MainMenu.Init');
  expect(contex.previouseExitState).toEqual('Launch');
  module.tick(20); // => MainMenu.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Play');
  expect(stateMachine2.getCurrentStateFullName()).toEqual('MainMenu.Play');

  stateMachine.send('Next'); // => ChooseGame => ChooseGame.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Init');
  expect(stateMachine2.getCurrentStateFullName()).toEqual('MainMenu.Play');
  expect(contex.previouseExitState).toEqual('MainMenu');
  module.tick(20); // => ChooseGame.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Play');
  stateMachine.send('Next'); // => ChooseGame.Shutdown
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Shutdown');

  module.tick(20); // => PlayGame => PlayGame.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('PlayGame.Init');
  module.tick(20); // => PlayGame.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('PlayGame.Play');
  stateMachine.send('Previous'); // => PlayGame.Shutdown
  expect(stateMachine.getCurrentStateFullName()).toEqual('PlayGame.Shutdown');

  module.tick(20); // => ChooseGame => ChooseGame.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Init');
  module.tick(20); // => ChooseGame.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Play');
  stateMachine.send('Previous'); // => ChooseGame.Shutdown
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Shutdown');

  module.tick(20); //=> MainMenu => MainMenu.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Init');
  module.tick(20); //=> MainMenu => MainMenu.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Play');

  module.destroy();
  module.tick(20);
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Play');

  module.init();
  module.tick(20);
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Play');
});
