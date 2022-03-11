import { FigureObjectImpl } from "./canvas-obj.js";
export class Bullet extends FigureObjectImpl {
}
export class BulletQueue {
    constructor() {
        this.queue = [];
        this.rear = -1;
        this.front = -1;
    }
    add(bullet) {
        this.queue[++this.rear] = bullet;
    }
    delete() {
        if (this.isEmpty()) {
            console.log("queue empty");
            return;
        }
        return this.queue[++this.front];
    }
    isEmpty() {
        if (this.front === this.rear) {
            return true;
        }
        else {
            return false;
        }
    }
    values() {
        const temp = [];
        while (!this.isEmpty()) {
            temp.push(this.delete());
        }
        return temp;
    }
}
//# sourceMappingURL=bullet.js.map