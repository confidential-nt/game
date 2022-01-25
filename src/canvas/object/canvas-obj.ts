import { CanvasObject, ImageObject, FigureObject } from "./obj-type.js";

export type ObjectLocation = {
  x: number;
  y: number;
};

export type ObjectFigure = {
  width: number;
  height: number;
};

export type ObjectColor = string | CanvasGradient | CanvasPattern;

export class BaseObject {
  protected _location: ObjectLocation;
  protected _figure: ObjectFigure;

  constructor(loc: ObjectLocation, fig: ObjectFigure) {
    this._location = loc;
    this._figure = fig;
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

  get location(): ObjectLocation {
    return this._location;
  }
  get figure(): ObjectFigure {
    return this._figure;
  }
  get color(): ObjectColor {
    return this._color;
  }

  drawOn(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this._color;
    ctx.fillRect(
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

  constructor(loc: ObjectLocation, fig: ObjectFigure, url: string) {
    super(loc, fig);
    this._url = url;
  }

  get location(): ObjectLocation {
    return this._location;
  }
  get figure(): ObjectFigure {
    return this._figure;
  }
  get url(): string {
    return this._url;
  }

  drawOn(ctx: CanvasRenderingContext2D): void {
    const img = new Image();
    img.src = this._url;
    img.onload = () => {
      ctx.drawImage(
        img,
        this._location.x,
        this._location.y,
        this._figure.width,
        this._figure.height
      );
    };
  }
}
