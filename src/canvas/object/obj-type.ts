import { ObjectFigure, ObjectLocation } from "./canvas-obj.js";

export interface CanvasObject {
  setLocation(location: Partial<ObjectLocation>): void;
  setFigure(figure: Partial<ObjectFigure>): void;
  drawOn(ctx: CanvasRenderingContext2D): void;
}

export interface ImageObject {
  readonly location: ObjectLocation;
  readonly figure: ObjectFigure;
  readonly url: string;
}

export interface FigureObject {
  readonly location: ObjectLocation;
  readonly figure: ObjectFigure;
  readonly color: string | CanvasGradient | CanvasPattern;
}
