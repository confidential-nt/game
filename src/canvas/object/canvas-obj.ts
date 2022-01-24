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
  private color: string | CanvasGradient | CanvasPattern;

  constructor(
    location: ObjectLocation,
    figure: ObjectFigure,
    color: string | CanvasGradient | CanvasPattern
  ) {
    this.location = location;
    this.figure = figure;
    this.color = color;
  }

  setLocation(location: Partial<ObjectLocation>) {
    this.location = { ...this.location, ...location };
  }

  setFigure(figure: Partial<ObjectFigure>) {
    this.figure = { ...this.figure, ...figure };
  }

  setColor(color: string | CanvasGradient | CanvasPattern) {
    this.color = color;
  }

  drawOn(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.location.x,
      this.location.y,
      this.figure.width,
      this.figure.height
    );
  }
}
