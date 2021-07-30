import { GameStateMachine } from '../../game-state';
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

test('test GameStateMachine', () => {
  const stateMachine = new GameStateMachine<GameStateContext, GameStateEvent>();

  stateMachine.addGameStateFactory(new LaunchStateFactory());
  stateMachine.addGameStateFactory(new SimeGameStateFactory('MainMenu'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('ChooseGame'));
  stateMachine.addGameStateFactory(new SimeGameStateFactory('PlayGame'));
  stateMachine.addGameStateFactory(new InitStateFactory());
  stateMachine.addGameStateFactory(new PlayStateFactory());
  stateMachine.addGameStateFactory(new ShutdownStateFactory());

  stateMachine.configure(GameStateConfig);

  const contex = stateMachine.getContext() as GameStateContext;

  expect(stateMachine.id).toEqual('SlotGame');
  expect(stateMachine.getCurrentStateFullName()).toBeUndefined();

  stateMachine.start(); // => Launch
  expect(stateMachine.getCurrentStateFullName()).toEqual('Launch');
  expect(contex.previousEntryState).toEqual('Launch');

  stateMachine.update(20); //=> MainMenu => MainMenu.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Init');
  expect(contex.previouseExitState).toEqual('Launch');
  stateMachine.update(20); // => MainMenu.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Play');

  stateMachine.send('Next'); // => ChooseGame => ChooseGame.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Init');
  expect(contex.previouseExitState).toEqual('MainMenu');
  stateMachine.update(20); // => ChooseGame.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Play');
  stateMachine.send('Next'); // => ChooseGame.Shutdown
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Shutdown');

  stateMachine.update(20); // => PlayGame => PlayGame.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('PlayGame.Init');
  stateMachine.update(20); // => PlayGame.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('PlayGame.Play');
  stateMachine.send('Previous'); // => PlayGame.Shutdown
  expect(stateMachine.getCurrentStateFullName()).toEqual('PlayGame.Shutdown');

  stateMachine.update(20); // => ChooseGame => ChooseGame.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Init');
  stateMachine.update(20); // => ChooseGame.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Play');
  stateMachine.send('Previous'); // => ChooseGame.Shutdown
  expect(stateMachine.getCurrentStateFullName()).toEqual('ChooseGame.Shutdown');

  stateMachine.update(20); //=> MainMenu => MainMenu.Init
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Init');
  stateMachine.update(20); //=> MainMenu => MainMenu.Play
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Play');

  stateMachine.stop();
  stateMachine.update(20);
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Play');

  stateMachine.start();
  stateMachine.update(20); // => cannot restart state machine now
  expect(stateMachine.getCurrentStateFullName()).toEqual('MainMenu.Play');
});
