import { createMachine, interpret, assign } from 'xstate';

/*
interface IGameStateContext {
  canTransit: boolean;
}

const disalbeTransit = assign<IGameStateContext>({
  canTransit: context => (context.canTransit = false),
});

const enalbeTransit = assign<IGameStateContext>({
  canTransit: context => (context.canTransit = true),
});

const gameSubState = {
  states: {
    Init: {
      entry: ['disalbeTransit'],
      //exit: 'logExit',
      on: {
        Finished: 'Play',
      },
    },
    Play: {
      entry: ['enalbeTransit'],
      on: {
        Next: 'Shutdown',
      },
    },
    Shutdown: {

      entry: ['disalbeTransit'],

      on: {
        Finished: {
          target: 'Shutdown',
          actions: 'enalbeTransit',
        },
      },
    },
  },
};
*/
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

const gameStateMachine = createMachine(
  {
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
        ...gameSubStates,
        on: {
          Next: {
            target: 'ChooseGame',
            in: '#SlotGame.MainMenu.Shutdown',
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
        ...gameSubStates,
        on: {
          Previous: {
            target: 'ChooseGame',
            in: '#SlotGame.PlayGame.Shutdown',
          },
        },
      },
    },
  },
  {
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
  },
);

const gameService = interpret(gameStateMachine)
  .onTransition(state => console.log(state.value))
  .start();
// => 0

gameService.send('Next');
gameService.send('Next');
gameService.send('Next');

gameService.stop();

// => 1
