import { makeAutoObservable } from 'mobx';
import { makeLoggable } from '../../src';

export class StopwatchStore {
  countUp = true;
  tickSpeed = 200;
  step = 1;
  count = 0;
  todos: any = null;

  lastIntervalId: number | null = null;

  constructor() {
    makeAutoObservable(
      this,
      {
        lastIntervalId: false,
      },
      { autoBind: true }
    );
    makeLoggable(this);
  }

  start() {
    if (this.lastIntervalId) {
      return;
    }

    this.lastIntervalId = window.setInterval(this.nextStep, this.tickSpeed);

    this.fetchData();
  }

  setTodos = (todos: any) => {
    this.todos = todos;
  };

  fetchData = () => {
    const data = {
      // A: Does not work.
      // todos are populated at StopwatchStore@nextStep,
      // expected at setTodos or fetchData.
      abc: { id: 'abc', firstName: 'First', lastName: 'Last' },

      // B: Does not work.
      // todos are populated at StopwatchStore@start,
      // expected at setTodos or fetchData.
      // 'def': { id: 'def' },

      // C: Works.
      // todos are populated at StopwatchStore@fetchData,
      // although not at setTodos.
      // 'def': 'xyz',

      // D: Works.
      // todos are populated at StopwatchStore@setTodos.
      // Blank object
    };

    this.setTodos(data);

    // this.todos = data
  };

  get isTicking() {
    return !!this.lastIntervalId;
  }

  get json() {
    return {
      count: this.count,
      isTicking: this.isTicking,
    };
  }

  pause() {
    if (this.lastIntervalId) {
      clearInterval(this.lastIntervalId);
      this.lastIntervalId = null;
    }
  }

  reset() {
    this.count = 0;
  }

  setCount(count: number) {
    this.count = count;
  }

  setCountUp(countUp: boolean) {
    this.countUp = countUp;
  }

  private nextStep() {
    if (this.countUp) {
      this.count += this.step;
    } else {
      this.count -= this.step;
    }
  }

  setTickSpeed(tickSpeed: number) {
    this.tickSpeed = tickSpeed;
    this.pause();
    this.start();
  }

  setStep(step: number) {
    this.step = step;
  }
}
