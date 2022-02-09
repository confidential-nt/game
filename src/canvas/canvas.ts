import { Background } from "./object/background.js";
import { CanvasObject, FigureObject, ImageObject } from "./object/obj-type.js";

export class Canvas {
  readonly ctx: CanvasRenderingContext2D | null;
  readonly element: HTMLCanvasElement = document.createElement("canvas");
  private backgroundImageUrl: string = "";

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
    this.backgroundImageUrl = background.url;
    const img = new Image();
    img.onload = () => {
      this.ctx?.drawImage(
        img,
        background.location.x,
        background.location.y,
        background.figure.width,
        background.figure.height
      );
    };
    img.hidden = true;
    img.id = "src";
    img.src = background.url;
    document.body.append(img);
  }

  addObject(obj: (FigureObject | ImageObject) & CanvasObject) {
    obj.drawOn(this.ctx! as CanvasRenderingContext2D);
  }

  removeObject(obj: (FigureObject | ImageObject) & CanvasObject) {
    const image = document.querySelector("#src")! as HTMLImageElement;
    image.width = this.element.width;
    image.height = this.element.height;
    obj.removeFrom(this.ctx! as CanvasRenderingContext2D, image);
  }
}
