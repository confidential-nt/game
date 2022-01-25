import {
  AnimationFrame,
  AnimationFrameHandler,
} from "./canvas/frame/animation-frame.js";
import {
  FigureObjectImpl,
  ImageObjectImpl,
} from "./canvas/object/canvas-obj.js";

class App {
  private _animationFrame?: AnimationFrame;

  constructor() {
    const animationFrame = new AnimationFrame(
      document.querySelector(".app")! as HTMLDivElement
    );

    animationFrame.setHandler((time: DOMHighResTimeStamp) => {
      const ImageObj = new ImageObjectImpl(
        { x: 15, y: 30 },
        { width: 20, height: 20 },
        "../images/spaceship.png"
      );
      const figureObj = new FigureObjectImpl(
        { x: 15, y: 100 },
        { width: 20, height: 20 },
        "tomato"
      );
      animationFrame.canvas.addObject(ImageObj);

      animationFrame.canvas.addObject(figureObj);

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
