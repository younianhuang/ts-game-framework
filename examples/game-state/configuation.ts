import { MachineConfig } from 'xstate';
import { GameStateEvent } from './events';
import { GameStateContext } from './context';
import { logEntry, logExit } from './actions';

/*
const options = {
  actions: {
    // action implementation
    logEntry: (context, event) => {
      console.log('entry');
    },
    logExit: (context, event) => {
      console.log('exit');
    },

    disalbeTransit: assign({
      canTransit: context => (context.canTransit = false),
    }),
    enalbeTransit: assign({
      canTransit: context => (context.canTransit = true),
    }),
  },
  guards: {
    canTrastit: context => {
      return context.canTransit;
    },
  },
}; */
const gameSubStates = {
  states: {
    Init: {
      on: {
        Finished: 'Play',
      },
    },
    Play: {
      on: {
        Next: 'Shutdown',
      },
    },
    Shutdown: {},
  },
};

export const GameStateConfig: MachineConfig<GameStateContext, any, GameStateEvent> = {
  id: 'SlotGame',
  initial: 'Launch',
  context: {
    canTransit: true,
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
