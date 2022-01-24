import { Canvas } from "../canvas.js";

export type AnimationFrameHandler = (time: DOMHighResTimeStamp) => void;

export class AnimationFrame {
  private _handler?: AnimationFrameHandler;
  readonly canvas: Canvas;

  constructor(private root: HTMLElement) {
    this.canvas = new Canvas(this.root);
  }

  get handler(): AnimationFrameHandler | undefined {
    if (this._handler) {
      return this._handler;
    }
  }

  setHandler(handler: AnimationFrameHandler) {
    this._handler = handler;
  }

  start() {
    window.requestAnimationFrame(this._handler! as AnimationFrameHandler);
  }
}
