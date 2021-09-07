import { IEvent } from './event';
import { isFunction, GameFrameworkError } from '../util';
import { Observer, Observable, Subscription, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

export class EventEmitter<T extends IEvent> {
  private readonly _subject: Subject<T>;
  private readonly _observable: Observable<T>;

  constructor() {
    this._subject = new Subject<T>();
    this._observable = this._subject.asObservable().pipe(share());
  }

  public subscribe(observerOrNext: Partial<Observer<T>> | ((value: T) => void)): Subscription {
    if (isFunction(observerOrNext)) {
      const next: (value: T) => void = observerOrNext;
      return this._subject.subscribe(next);
    }

    const observer = <Partial<Observer<T>>>observerOrNext;
    return this._subject.subscribe(observer);
  }

  public asObservable(): Observable<T> {
    return this._observable;
  }

  public emitEvent(event: T): void {
    if (event.name === undefined || event.name === null) {
      throw new GameFrameworkError('An event must have a name.');
    }

    this._subject.next(event);
  }

  public completeEvent(): void {
    this._subject.complete();
  }
}
