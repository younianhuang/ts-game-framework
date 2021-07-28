import { MachineConfig, EventObject } from 'xstate';

//export interface IGameStateContext {}

export type IGameStateEvent = EventObject;

//export type IGameStateConfig = MachineConfig<IGameStateContext, any, IGameStateEvent>;

export type IGameStateConfig<TContext, TEvent extends IGameStateEvent> = MachineConfig<TContext, any, TEvent>;
