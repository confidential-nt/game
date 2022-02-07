import { Canvas } from "../canvas.js";

export type AnimationFrameHandler = (time: DOMHighResTimeStamp) => void;

export class AnimationFrame {
  private _handler?: AnimationFrameHandler;

  constructor() {}

  get handler(): AnimationFrameHandler | undefined {
    if (this._handler) {
      return this._handler;
    }
  }

  setHandler(handler: AnimationFrameHandler) {
    this._handler = handler;
  }

  sleep(second: number) {
    return new Promise((res, rej) => {
      setTimeout(() => res("done"), second * 1000);
    });
  }

  start() {
    window.requestAnimationFrame(this._handler! as AnimationFrameHandler);
  }
}
