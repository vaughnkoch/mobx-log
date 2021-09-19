import {
  ActionEvent,
  ComputedEvent,
  Logger,
  LogWriter,
  Now,
  ObservableEvent,
} from './types';

export class DefaultLogger implements Logger {
  constructor(private logWriter: LogWriter, private now?: Now) {}

  logObservable(event: ObservableEvent) {
    const info = [
      'OBSERVABLE',
      event.name,
      event.oldValue,
      '->',
      event.newValue,
    ];

    if (this.now) {
      info.unshift(this.now());
    }

    this.logWriter.write(...info);
  }

  logAction(event: ActionEvent) {
    const info = ['ACTION', event.name, event.arguments];

    if (this.now) {
      info.unshift(this.now());
    }

    this.logWriter.write(...info);
  }

  logComputed(event: ComputedEvent) {
    const info = ['COMPUTED', event.name, event.oldValue, '->', event.newValue];

    if (this.now) {
      info.unshift(this.now());
    }

    this.logWriter.write(...info);
  }
}
