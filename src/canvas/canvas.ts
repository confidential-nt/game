import { Background } from "./object/background.js";
import { CanvasObject, FigureObject, ImageObject } from "./object/obj-type.js";

export class Canvas {
  readonly ctx: CanvasRenderingContext2D | null;
  readonly element: HTMLCanvasElement = document.createElement("canvas");
  private _backgroundImageUrl?: string;
  private _background?: Background;

  constructor(private root: HTMLElement, backgrondUrl?: string) {
    this.root.insertAdjacentElement("beforeend", this.element);
    this.element.id = "canvas";
    const rect = this.element.getBoundingClientRect();

    this.element.width = rect.width;
    this.element.height = rect.height;

    this.ctx = this.element.getContext("2d");

    if (backgrondUrl) {
      this.setBackgroundImage(
        new Background(
          { x: 0, y: 0 },
          { width: this.element.width, height: this.element.height },
          backgrondUrl
        )
      );
    }
  }

  setBackgroundImage(background: Background) {
    this._backgroundImageUrl = background.url;
    this._background = background;
    background.drawOn(this.ctx! as CanvasRenderingContext2D);
  }

  get background(): Background | undefined {
    if (this._background) return this._background;
  }

  get backgroundImageUrl() {
    return this._backgroundImageUrl;
  }
}
