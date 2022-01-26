import { ObjectFigure, ObjectLocation } from "./canvas-obj.js";

export interface CanvasObject {
  readonly location: ObjectLocation;
  readonly figure: ObjectFigure;

  setLocation(location: Partial<ObjectLocation>): void;
  setFigure(figure: Partial<ObjectFigure>): void;
  drawOn(ctx: CanvasRenderingContext2D): void;
  removeFrom(ctx: CanvasRenderingContext2D, img?: HTMLImageElement): void;
}

export interface ImageObject {
  readonly url: string;
}

export interface FigureObject {
  readonly color: string | CanvasGradient | CanvasPattern;
}
