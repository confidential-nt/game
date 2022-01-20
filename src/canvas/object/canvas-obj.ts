type ObjectLocation = {
  x: number;
  y: number;
};

type ObjectFigure = {
  width: number;
  height: number;
};

interface CanvasObject {
  attachTo(config: ObjectLocation, ctx: CanvasRenderingContext2D): void;
}

interface ImageObject {}

interface FigureObject {}

class BaseObject {
  private location: ObjectLocation;
  private figure: ObjectFigure;

  constructor(location: ObjectLocation, figure: ObjectFigure) {
    this.location = location;
    this.figure = figure;
  }

  setLocation(location: Partial<ObjectLocation>) {
    this.location = { ...this.location, ...location };
  }

  setFigure(figure: Partial<ObjectFigure>) {
    this.figure = { ...this.figure, ...figure };
  }

  drawOn(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(
      this.location.x,
      this.location.y,
      this.figure.width,
      this.figure.height
    );
  }
}
