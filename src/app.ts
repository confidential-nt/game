import { Canvas } from "./canvas/canvas.js";
import {
  AnimationFrame,
  AnimationFrameHandler,
  KeyFrames,
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
  private readonly canvas: Canvas = new Canvas(
    document.querySelector(".app")! as HTMLDivElement,
    "/images/universe.jpg"
  );
  readonly user: Player = new Player("user");
  readonly computer: Player = new Player("computer");

  constructor() {
    const ready = async () => {
      await animationFrame.sleep(0.1);
      this.canvas.addObject(this.user.ship);
    };

    const animationFrame = new AnimationFrame();
    this.control = new Control();

    const w = 100;

    this.user.ship = new Ship(
      { x: this.canvas.element.width / 2 - w / 2, y: 600 },
      { width: w, height: 100 },
      "/images/spaceship2.png"
    );

    this.computer.ship = new Ship(
      { x: 15, y: 200 },
      { width: 20, height: 20 },
      "/images/spaceship2.png"
    );

    ready();

    this.control.setKeyListener((e: KeyboardEvent) => {
      // 컨트롤 안에 animationframe, player 둘다 넣어버리는 거지.
      const keyCode = e.code;

      switch (keyCode) {
        case "ArrowUp":
          this.user.ship.move(this.canvas.ctx! as CanvasRenderingContext2D, {
            y: this.user.ship.location.y - 25,
          });
          break;
        case "ArrowDown":
          this.user.ship.move(this.canvas.ctx! as CanvasRenderingContext2D, {
            y: this.user.ship.location.y + 25,
          });
          break;
        case "ArrowLeft":
          this.user.ship.move(this.canvas.ctx! as CanvasRenderingContext2D, {
            x: this.user.ship.location.x - 25,
          });
          break;
        case "ArrowRight":
          this.user.ship.move(this.canvas.ctx! as CanvasRenderingContext2D, {
            x: this.user.ship.location.x + 25,
          });
          break;
      }
    });

    const canvasHeight = this.canvas.element.height;
    let x = 0;
    let y = -canvasHeight + this.user.ship.figure.height;
    const keyFrames = new KeyFrames();

    keyFrames.addKeyFrame(() => {
      const image = document.querySelector("#src")! as HTMLImageElement;

      this.canvas.ctx?.drawImage(image, x, y);

      y += 4;

      if (y > 0) {
        y = -canvasHeight + this.user.ship.figure.height;
      }
      this.user.ship.drawOn(this.canvas.ctx! as CanvasRenderingContext2D);
    });

    animationFrame.setHandler((time: DOMHighResTimeStamp) => {
      keyFrames.play();
      window.requestAnimationFrame(
        animationFrame.handler! as AnimationFrameHandler
      );
    });

    this._animationFrame = animationFrame;

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
