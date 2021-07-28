import { assign } from 'xstate';
import { GameStateEvent } from './events';
import { GameStateContext } from './context';
/*
const disalbeTransit = assign<IGameStateContext>({
  canTransit: context => (context.canTransit = false),
});

const enalbeTransit = assign<IGameStateContext>({
  canTransit: context => (context.canTransit = true),
});
*/
export const logEntry = (context: GameStateContext, event: GameStateEvent) => {
  console.log('entry');
  //console.log(event);
};
export const logExit = (context: GameStateContext, event: GameStateEvent) => {
  console.log('exit');
  //console.log(event);
};
