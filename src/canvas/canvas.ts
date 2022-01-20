export class Canvas {
  private readonly ctx: CanvasRenderingContext2D | null;
  readonly element: HTMLCanvasElement = document.createElement("canvas");

  constructor(private root: HTMLElement) {
    this.root.insertAdjacentElement("beforeend", this.element);
    this.element.id = "canvas";
    const rect = this.element.getBoundingClientRect();

    this.element.width = rect.width;
    this.element.height = rect.height;

    this.ctx = this.element.getContext("2d");

    this.setBackgroundImage("./images/universe.jpg");
  }

  setBackgroundImage(imageUrl: string) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      this.ctx?.drawImage(img, 0, 0);
    };
  }
}
