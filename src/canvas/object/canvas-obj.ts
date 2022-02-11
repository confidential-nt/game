import { CanvasObject, ImageObject, FigureObject } from "./obj-type.js";

export type ObjectLocation = {
  x: number;
  y: number;
};

export type ObjectFigure = {
  width: number;
  height: number;
  rotate?: number;
};

export type ObjectColor = string | CanvasGradient | CanvasPattern;

export class BaseObject {
  protected _location: ObjectLocation;
  protected _figure: ObjectFigure;

  constructor(loc: ObjectLocation, fig: ObjectFigure) {
    this._location = loc;
    this._figure = fig;
  }

  get location(): ObjectLocation {
    return this._location;
  }
  get figure(): ObjectFigure {
    return this._figure;
  }

  setLocation(location: Partial<ObjectLocation>) {
    this._location = { ...this._location, ...location };
  }

  setFigure(figure: Partial<ObjectFigure>) {
    this._figure = { ...this._figure, ...figure };
  }
}

export class FigureObjectImpl
  extends BaseObject
  implements FigureObject, CanvasObject
{
  private _color: ObjectColor;

  constructor(loc: ObjectLocation, fig: ObjectFigure, color: ObjectColor) {
    super(loc, fig);
    this._color = color;
  }

  get color(): ObjectColor {
    return this._color;
  }

  drawOn(ctx: CanvasRenderingContext2D): void {
    if (this._figure.rotate) {
      ctx.save();
      ctx.rotate(this._figure.rotate * (Math.PI / 180));
    }

    ctx.fillStyle = this._color;
    ctx.fillRect(
      this._location.x,
      this._location.y,
      this._figure.width,
      this._figure.height
    );

    if (this._figure.rotate) {
      ctx.restore();
    }
  }

  removeFrom(ctx: CanvasRenderingContext2D, image: HTMLImageElement): void {
    ctx.drawImage(
      image,
      this._location.x,
      this._location.y,
      this._figure.width,
      this._figure.height,
      this._location.x,
      this._location.y,
      this._figure.width,
      this._figure.height
    );
  }
}

export class ImageObjectImpl
  extends BaseObject
  implements ImageObject, CanvasObject
{
  private _url: string;
  private _isLoaded: boolean = false;

  constructor(loc: ObjectLocation, fig: ObjectFigure, url: string) {
    super(loc, fig);
    this._url = url;

    const img = new Image();
    img.onload = () => {
      this._isLoaded = true;
    };

    img.src = url;

    img.hidden = true;

    document.body.append(img);
  }

  get url(): string {
    return this._url;
  }

  get isLoaded(): boolean {
    return this._isLoaded;
  }

  drawOn(ctx: CanvasRenderingContext2D): void {
    const img = document.querySelector(
      `[src="${this._url}"]`
    )! as HTMLImageElement;

    const canvas = document.querySelector("#canvas")! as HTMLCanvasElement;

    if (this._figure.rotate) {
      ctx.save();

      ctx.translate(canvas.width / 2 + this._figure.width / 2, 120);
      ctx.rotate(this._figure.rotate * (Math.PI / 180));
    }

    ctx.drawImage(
      img,
      this._location.x,
      this._location.y,
      this._figure.width,
      this._figure.height
    );

    if (this._figure.rotate) {
      ctx.restore();
    }
  }

  removeFrom(ctx: CanvasRenderingContext2D, image: HTMLImageElement): void {
    ctx.drawImage(
      image,
      this._location.x,
      this._location.y,
      this._figure.width,
      this._figure.height,
      this._location.x,
      this._location.y,
      this._figure.width,
      this._figure.height
    );
  }
}
