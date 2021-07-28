import { MachineConfig, EventObject, Event } from 'xstate';

export type IGameStateEvent = EventObject;

export type GameEvent<TEvent extends IGameStateEvent> = Event<TEvent>;

export type IGameStateConfig<TContext, TEvent extends IGameStateEvent> = MachineConfig<TContext, any, TEvent>;
