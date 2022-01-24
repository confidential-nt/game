import {
  AnimationFrame,
  AnimationFrameHandler,
} from "./canvas/frame/animation-frame.js";

class App {
  private _animationFrame?: AnimationFrame;

  constructor() {
    const animationFrame = new AnimationFrame(
      document.querySelector(".app")! as HTMLDivElement
    );

    animationFrame.setHandler((time: DOMHighResTimeStamp) => {
      window.requestAnimationFrame(
        animationFrame.handler! as AnimationFrameHandler
      );
    });

    this.setAnimationFrame(animationFrame);
    this.run();
  }

  run() {
    if (this._animationFrame) {
      this._animationFrame.start();
    }
  }

  setAnimationFrame(animationFrame: AnimationFrame) {
    this._animationFrame = animationFrame;
  }
}

new App();
