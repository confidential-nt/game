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
import { Control } from "./control/control.js";
import { Player } from "./player/player.js";

class App {
  private _animationFrame?: AnimationFrame;
  private control?: Control;

  constructor() {
    const animationFrame = new AnimationFrame(
      document.querySelector(".app")! as HTMLDivElement
    );

    this.control = new Control();

    const user = new Player("user");
    const computer = new Player("computer");

    user.ship = new Ship(
      { x: 300, y: 600 },
      { width: 100, height: 100 },
      "../images/spaceship2.png"
    );

    computer.ship = new Ship(
      { x: 15, y: 200 },
      { width: 20, height: 20 },
      "../images/spaceship2.png"
    );

    const ready = async () => {
      await animationFrame.sleep(0.1);
      animationFrame.canvas.addObject(user.ship);
    };

    ready();

    this.control.setKeyListener((e: KeyboardEvent) => {
      const keyCode = e.code;
      const userLoc = user.ship.location;
      switch (keyCode) {
        case "ArrowUp":
          animationFrame.canvas.removeObject(user.ship);
          user.ship.setLocation({ y: userLoc.y - 10 });
          animationFrame.canvas.addObject(user.ship);
          break;
        case "ArrowDown":
          animationFrame.canvas.removeObject(user.ship);
          user.ship.setLocation({ y: userLoc.y + 10 });
          animationFrame.canvas.addObject(user.ship);
          break;
        case "ArrowLeft":
          animationFrame.canvas.removeObject(user.ship);
          user.ship.setLocation({ x: userLoc.x - 10 });
          animationFrame.canvas.addObject(user.ship);
          break;
        case "ArrowRight":
          animationFrame.canvas.removeObject(user.ship);
          user.ship.setLocation({ x: userLoc.x + 10 });
          animationFrame.canvas.addObject(user.ship);
          break;
      }
    });

    animationFrame.setHandler(async (time: DOMHighResTimeStamp) => {
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
