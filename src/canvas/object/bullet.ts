import { FigureObjectImpl } from "./canvas-obj.js";

export class Bullet extends FigureObjectImpl {}

export class BulletQueue {
  readonly queue: Bullet[] = [];
  private rear: number = -1;
  private front: number = -1;

  add(bullet: Bullet) {
    this.queue[++this.rear] = bullet;
  }

  delete(): Bullet | undefined {
    if (this.isEmpty()) {
      console.log("queue empty");
      return;
    }
    return this.queue[++this.front];
  }

  isEmpty(): boolean {
    if (this.front === this.rear) {
      return true;
    } else {
      return false;
    }
  }

  values(): (Bullet | undefined)[] {
    const temp = [];
    while (!this.isEmpty()) {
      temp.push(this.delete());
    }

    return temp;
  }
}
