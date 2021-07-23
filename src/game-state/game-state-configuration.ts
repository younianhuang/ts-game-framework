import { MachineConfig, EventObject, StateSchema } from 'xstate';

export interface IGameStateContext {
  id?: string;
}

export type IGameStateSchema = StateSchema;

export type IGameStateEvent = EventObject;

export type IGameStateConfig = MachineConfig<IGameStateContext, IGameStateSchema, EventObject>;
