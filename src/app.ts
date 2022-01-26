import {
  AnimationFrame,
  AnimationFrameHandler,
} from "./canvas/frame/animation-frame.js";
import { Bullet } from "./canvas/object/bullet.js";
import {
  FigureObjectImpl,
  ImageObjectImpl,
} from "./canvas/object/canvas-obj.js";
import { Ship } from "./canvas/object/ship.js";
import { Player } from "./player/player.js";

class App {
  private _animationFrame?: AnimationFrame;

  constructor() {
    const animationFrame = new AnimationFrame(
      document.querySelector(".app")! as HTMLDivElement
    );

    const user = new Player("user");
    const computer = new Player("computer");

    user.ship = new Ship(
      { x: 15, y: 30 },
      { width: 20, height: 20 },
      "../images/spaceship.png"
    );

    computer.ship = new Ship(
      { x: 15, y: 200 },
      { width: 20, height: 20 },
      "../images/spaceship.png"
    );

    animationFrame.setHandler((time: DOMHighResTimeStamp) => {
      animationFrame.canvas.addObject(user.ship);

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
