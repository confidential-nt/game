import { Canvas } from "./canvas/canvas.js";
import {
  AnimationFrame,
  AnimationFrameHandler,
  KeyFrames,
} from "./canvas/frame/animation-frame.js";
import { Background } from "./canvas/object/background.js";
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
    document.querySelector(".app")! as HTMLDivElement
  );
  readonly user: Player = new Player("user");
  readonly computer: Player = new Player("computer");

  constructor() {
    const animationFrame = new AnimationFrame();
    this.control = new Control();

    this.canvas.setBackgroundImage(
      new Background(
        { x: 0, y: 0 },
        {
          width: this.canvas.element.width,
          height: this.canvas.element.height,
        },
        "/images/universe.jpg"
      )
    );

    const userShipWidth = 100;

    this.user.ship = new Ship(
      { x: this.canvas.element.width / 2 - userShipWidth / 2, y: 600 },
      { width: userShipWidth, height: 100 },
      "/images/spaceship2.png"
    );

    this.computer.ship = new Ship(
      { x: 0, y: 0 },
      { width: 100, height: 100, rotate: 180 },
      "/images/spaceship2.png"
    );

    this.user.ship.trailClearSrc = "/images/universe.jpg";

    this.control.setKeyListener((e: KeyboardEvent) => {
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
        case "Space":
          this.user.ship.bulletQueue.add(
            new Bullet(
              {
                x:
                  this.user.ship.location.x +
                  this.user.ship.figure.width / 2 -
                  5,
                y: this.user.ship.location.y - 10,
              },
              { width: 10, height: 10 },
              "tomato"
            )
          );
          break;
      }
    });

    const canvasHeight = this.canvas.element.height;
    let x = 0;
    let y = -canvasHeight + this.user.ship.figure.height + 20;
    const keyFrames = new KeyFrames();

    keyFrames.addKeyFrame(() => {
      if (!this.user.ship.isLoaded || !this.computer.ship.isLoaded) return;
      if (!this.canvas.background?.isLoaded) return;

      const image = document.querySelector(
        `[src="${this.canvas.backgroundImageUrl}"]`
      )! as HTMLImageElement;

      this.canvas.ctx?.drawImage(image, x, y);

      y += 4;

      if (y > 0) {
        y = -canvasHeight + this.user.ship.figure.height + 20;
      }
      this.user.ship.drawOn(this.canvas.ctx! as CanvasRenderingContext2D);
      this.computer.ship.drawOn(this.canvas.ctx! as CanvasRenderingContext2D);
    });

    const queue: Bullet[] = [];

    keyFrames.addKeyFrame(() => {
      while (!this.user.ship.bulletQueue.isEmpty()) {
        const bullet = this.user.ship.bulletQueue.delete();
        if (bullet) {
          queue.push(bullet);
        }
      }

      for (let bullet of queue) {
        bullet.setLocation({ y: bullet.location.y - 4 });
        bullet.drawOn(this.canvas.ctx! as CanvasRenderingContext2D);

        if (bullet.location.y < 0) {
          const index = queue.findIndex((el) => el === bullet);
          queue.splice(index, 1);

          bullet.removeFrom(
            this.canvas.ctx! as CanvasRenderingContext2D,
            document.querySelector(
              `[src="${this.user.ship.trailClearSrc}"]`
            )! as HTMLImageElement
          );
        }
      }
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

// app 구조 수정
// 공격 만들기
// stack을 queue로 바꾸는 건? 그렇게 해서 y가 음수가 되면 큐에서 삭제시켜버리고.. stack배열을 readonly로 직접적으로 노출시키지 않는 방법? 아니면 array[3]로 수정 못하게 하는 방법?
