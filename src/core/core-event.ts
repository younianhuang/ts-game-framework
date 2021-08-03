import { IEvent } from '../event';

export type ICoreEvent = IEvent;

export class BeforeInitEvent implements ICoreEvent {
  public static get Name(): string {
    return 'BeforeInitEvent';
  }

  get name(): string {
    return BeforeInitEvent.Name;
  }
}

export class AfterInitEvent implements ICoreEvent {
  public static get Name(): string {
    return 'AfterInitEvent';
  }

  get name(): string {
    return BeforeInitEvent.Name;
  }
}
