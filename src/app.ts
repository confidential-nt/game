import { Canvas } from "./canvas/canvas.js";

type AnimationFrameHandler = (time: DOMHighResTimeStamp) => void;

class App {
  private readonly canvas: Canvas;
  private _animationFrameHandler?: AnimationFrameHandler;

  constructor(private root: HTMLElement) {
    this.canvas = new Canvas(this.root);
  }

  run() {
    if (this._animationFrameHandler) {
      window.requestAnimationFrame(this._animationFrameHandler);
    }
  }

  setAnimationFrame(callback: AnimationFrameHandler) {
    this._animationFrameHandler = callback;
  }

  get animationFrameHandler(): AnimationFrameHandler | undefined {
    if (this._animationFrameHandler) {
      return this._animationFrameHandler;
    }
  }
}

const app = new App(document.querySelector(".app")! as HTMLDivElement);
app.setAnimationFrame((time: DOMHighResTimeStamp) => {
  window.requestAnimationFrame(
    app.animationFrameHandler! as AnimationFrameHandler
  );
});
app.run();
