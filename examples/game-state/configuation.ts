import { GameStateEvent } from './event';
import { GameStateContext } from './context';
import { IGameStateConfig } from '../../src/game-state';

export const GameStateConfig: IGameStateConfig<GameStateContext, GameStateEvent> = {
  id: 'SlotGame',
  initial: 'Launch',
  context: {
    previousEntryState: '',
    previouseExitState: '',
  },
  states: {
    Launch: {
      on: {
        Next: [
          {
            target: 'MainMenu',
          },
        ],
      },
    },
    MainMenu: {
      initial: 'Init',
      states: {
        Init: {
          on: {
            Finished: 'Play',
          },
        },
        Play: {},
      },
      on: {
        Next: {
          target: 'ChooseGame',
          in: '#SlotGame.MainMenu.Play',
        },
      },
    },
    ChooseGame: {
      initial: 'Init',

      states: {
        Init: {
          on: {
            Finished: 'Play',
          },
        },
        Play: {
          on: {
            Next: 'Shutdown',
            Previous: 'Shutdown',
          },
        },
        Shutdown: {},
      },
      on: {
        Next: {
          target: 'PlayGame',
          in: '#SlotGame.ChooseGame.Shutdown',
        },
        Previous: {
          target: 'MainMenu',
          in: '#SlotGame.ChooseGame.Shutdown',
        },
      },
    },
    PlayGame: {
      initial: 'Init',
      states: {
        Init: {
          on: {
            Finished: 'Play',
          },
        },
        Play: {
          on: {
            Previous: 'Shutdown',
          },
        },
        Shutdown: {},
      },
      on: {
        Previous: {
          target: 'ChooseGame',
          in: '#SlotGame.PlayGame.Shutdown',
        },
      },
    },
  },
};
