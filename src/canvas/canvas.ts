import { CanvasObject, FigureObject, ImageObject } from "./object/obj-type.js";

export class Canvas {
  private readonly ctx: CanvasRenderingContext2D | null;
  readonly element: HTMLCanvasElement = document.createElement("canvas");
  private backgroundImageUrl: string = "";

  constructor(private root: HTMLElement) {
    this.root.insertAdjacentElement("beforeend", this.element);
    this.element.id = "canvas";
    const rect = this.element.getBoundingClientRect();

    this.element.width = rect.width;
    this.element.height = rect.height;

    this.ctx = this.element.getContext("2d");

    this.setBackgroundImage("../images/universe.jpg");
  }

  setBackgroundImage(imageUrl: string) {
    this.backgroundImageUrl = imageUrl;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      this.ctx?.drawImage(img, 0, 0);
    };
  }

  addObject(obj: (FigureObject | ImageObject) & CanvasObject) {
    obj.drawOn(this.ctx! as CanvasRenderingContext2D);
  }

  removeObject(obj: (FigureObject | ImageObject) & CanvasObject) {
    const img = new Image();
    img.src = this.backgroundImageUrl;
    img.onload = () => {
      this.ctx?.drawImage(
        img,
        obj.location.x,
        obj.location.y,
        obj.figure.width,
        obj.figure.height
      );
    };
  }
}
