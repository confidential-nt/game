import { ImageObjectImpl, ObjectFigure, ObjectLocation } from "./canvas-obj.js";

export class Ship extends ImageObjectImpl {
  private shipImage = document.querySelector(
    `[src="${this.url}"]`
  )! as HTMLImageElement;

  move(ctx: CanvasRenderingContext2D, loc: Partial<ObjectLocation>) {
    const image: HTMLImageElement = document.querySelector(
      "#src"
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
}
