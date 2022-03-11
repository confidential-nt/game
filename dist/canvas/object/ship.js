import { BulletQueue } from "./bullet.js";
import { ImageObjectImpl } from "./canvas-obj.js";
export class Ship extends ImageObjectImpl {
    constructor() {
        super(...arguments);
        this.shipImage = document.querySelector(`[src="${this.url}"]`);
        this.bulletQueue = new BulletQueue();
    }
    set trailClearSrc(src) {
        this._trailClearSrc = src;
    }
    get trailClearSrc() {
        if (this._trailClearSrc)
            return this._trailClearSrc;
    }
    set bullet(bullet) {
        if (bullet) {
            this._bullet = bullet;
        }
    }
    get bullet() {
        if (this._bullet)
            return this._bullet;
    }
    move(ctx, loc) {
        if (!this._trailClearSrc)
            return;
        const image = document.querySelector(`[src="${this._trailClearSrc}"]`);
        const canvas = document.querySelector("#canvas");
        const [canvasWidth, canvasHeight] = [
            canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect().width,
            canvas.getBoundingClientRect().height,
        ];
        image.width = canvasWidth;
        image.height = canvasHeight;
        if (loc.x > canvasWidth - this._figure.width ||
            loc.x < 0)
            return;
        if (loc.y > canvasHeight - this._figure.height ||
            loc.y < 0) {
            return;
        }
        this.removeFrom(ctx, image);
        this.setLocation(loc);
        this.drawOn(ctx);
    }
    attack(ctx, loc) {
        if (!this._bullet)
            return;
        if (loc) {
            this._bullet.setLocation(Object.assign(Object.assign({}, this._bullet.location), loc));
        }
        this._bullet.drawOn(ctx);
    }
}
//# sourceMappingURL=ship.js.map