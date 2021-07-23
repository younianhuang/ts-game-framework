import { IEvent, EventEmitter } from '../event';

enum NetworkConnectionState {
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
  ERROR,
}

enum NetworkError {
  None,
  ServerNotFound,
  Timeout,
}

interface INetworkEvent extends IEvent {}
class ConnectingEvent implements INetworkEvent {
  static readonly Name = 'Connecting';

  readonly name = ConnectingEvent.Name;
}

class ConnectedEvent implements INetworkEvent {
  static readonly Name = 'Connected';

  readonly name: string = ConnectedEvent.Name;
}

class DisconnectedEvent implements INetworkEvent {
  static readonly Name = 'Disconnected';

  readonly name: string = DisconnectedEvent.Name;
}

class NetworkErrorEvent implements INetworkEvent {
  errorCode: number;

  static readonly Name = 'NetworkError';

  readonly name: string;

  constructor(errorCode: number) {
    this.name = NetworkErrorEvent.Name;
    this.errorCode = errorCode;
  }
}

class NetworkConnection extends EventEmitter<INetworkEvent> {
  constructor() {
    super();
  }

  public connect() {
    this._emitEvent(new ConnectingEvent());
    setTimeout(() => {
      this._emitEvent(new ConnectedEvent());
    }, 200);
  }

  public disconnect() {
    this._emitEvent(new DisconnectedEvent());
  }

  public connectWithError(erroCode: number) {
    this._emitEvent(new NetworkErrorEvent(erroCode));
  }

  public dispose(): void {
    this._completeEvent();
  }
}

class NetworkConnectionObserver {
  state: number;
  errorCode: number;

  constructor() {
    this.state = NetworkConnectionState.DISCONNECTED;
    this.errorCode = NetworkError.None;
    this.next = this.next.bind(this);
  }

  public next(event: INetworkEvent): void {
    switch (event.name) {
      case ConnectingEvent.Name:
        this.state = NetworkConnectionState.CONNECTING;
        break;
      case ConnectedEvent.Name:
        this.state = NetworkConnectionState.CONNECTED;
        break;
      case DisconnectedEvent.Name:
        this.state = NetworkConnectionState.DISCONNECTED;
        break;
      case NetworkErrorEvent.Name:
        const err = event as NetworkErrorEvent;
        this.state = NetworkConnectionState.ERROR;
        this.errorCode = err.errorCode;
        break;
    }
  }
  public error(err: Error): void {}

  /// observer can be partital
  //public complete(): void {}
}

test('test game framework event emitter', done => {
  const connection = new NetworkConnection();

  const observer1 = new NetworkConnectionObserver();
  const observer2 = new NetworkConnectionObserver();

  connection.subscribe(observer1);
  const subscription2 = connection.asObservable().subscribe(observer2.next);

  connection.subscribe(event => {
    if (event.name === ConnectedEvent.Name) {
      connection.disconnect();
      expect(observer1.state).toEqual(NetworkConnectionState.DISCONNECTED);

      connection.dispose();
      connection.connect();
      expect(observer1.state).toEqual(NetworkConnectionState.DISCONNECTED);

      done();
    }
  });

  expect(observer1.state).toEqual(NetworkConnectionState.DISCONNECTED);

  connection.connectWithError(NetworkError.ServerNotFound);
  expect(observer1.state).toEqual(NetworkConnectionState.ERROR);
  expect(observer1.errorCode).toEqual(NetworkError.ServerNotFound);
  expect(observer2.state).toEqual(NetworkConnectionState.ERROR);

  const observer3 = new NetworkConnectionObserver();
  // make sure observer only receive event after subscribing
  const subscription3 = connection.subscribe(observer3);
  expect(observer3.state).toEqual(NetworkConnectionState.DISCONNECTED);

  subscription2.unsubscribe();
  subscription3.unsubscribe();
  connection.connect();
  expect(observer1.state).toEqual(NetworkConnectionState.CONNECTING);
  expect(observer2.state).toEqual(NetworkConnectionState.ERROR);
}, 1000);
