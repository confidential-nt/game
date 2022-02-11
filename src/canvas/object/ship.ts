import { Bullet, BulletQueue } from "./bullet.js";
import { ImageObjectImpl, ObjectFigure, ObjectLocation } from "./canvas-obj.js";

export class Ship extends ImageObjectImpl {
  private shipImage = document.querySelector(
    `[src="${this.url}"]`
  )! as HTMLImageElement;
  private _trailClearSrc?: string;
  readonly bulletQueue: BulletQueue = new BulletQueue();
  private _bullet?: Bullet;

  set trailClearSrc(src: string | undefined) {
    this._trailClearSrc = src;
  }

  get trailClearSrc(): string | undefined {
    if (this._trailClearSrc) return this._trailClearSrc;
  }

  set bullet(bullet: Bullet | undefined) {
    if (bullet) {
      this._bullet = bullet;
    }
  }

  get bullet(): Bullet | undefined {
    if (this._bullet) return this._bullet;
  }

  move(ctx: CanvasRenderingContext2D, loc: Partial<ObjectLocation>) {
    if (!this._trailClearSrc) return;

    const image: HTMLImageElement = document.querySelector(
      `[src="${this._trailClearSrc}"]`
    )! as HTMLImageElement;

    const canvas = document.querySelector("#canvas")! as HTMLCanvasElement;

    const [canvasWidth, canvasHeight] = [
      canvas?.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height,
    ];

    image.width = canvasWidth;
    image.height = canvasHeight;

    if (
      (loc.x! as number) > canvasWidth - this._figure.width ||
      (loc.x! as number) < 0
    )
      return;

    if (
      (loc.y! as number) > canvasHeight - this._figure.height ||
      (loc.y! as number) < 0
    ) {
      return;
    }

    this.removeFrom(ctx! as CanvasRenderingContext2D, image);
    this.setLocation(loc);

    this.drawOn(ctx! as CanvasRenderingContext2D);
  }

  attack(ctx: CanvasRenderingContext2D, loc?: Partial<ObjectLocation>) {
    if (!this._bullet) return;

    if (loc) {
      this._bullet.setLocation({
        ...this._bullet.location,
        ...loc,
      });
    }

    this._bullet.drawOn(ctx);
  }
}
