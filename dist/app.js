import { Canvas } from "./canvas/canvas.js";
import { AnimationFrame, KeyFrames, } from "./canvas/frame/animation-frame.js";
import { Background } from "./canvas/object/background.js";
import { Bullet } from "./canvas/object/bullet.js";
import { Ship } from "./canvas/object/ship.js";
import { Control } from "./control/control.js";
import { Player } from "./player/player.js";
class App {
    constructor() {
        this.canvas = new Canvas(document.querySelector(".app"));
        this.user = new Player("user");
        this.computer = new Player("computer");
        const animationFrame = new AnimationFrame();
        this.control = new Control();
        this.canvas.setBackgroundImage(new Background({ x: 0, y: 0 }, {
            width: this.canvas.element.width,
            height: this.canvas.element.height,
        }, "/images/universe.jpg"));
        const userShipWidth = 100;
        this.user.ship = new Ship({ x: this.canvas.element.width / 2 - userShipWidth / 2, y: 600 }, { width: userShipWidth, height: 100 }, "/images/spaceship2.png");
        this.computer.ship = new Ship({ x: 0, y: 0 }, { width: 100, height: 100, rotate: 180 }, "/images/spaceship2.png");
        this.user.ship.trailClearSrc = "/images/universe.jpg";
        this.control.setKeyListener((e) => {
            const keyCode = e.code;
            switch (keyCode) {
                case "ArrowUp":
                    this.user.ship.move(this.canvas.ctx, {
                        y: this.user.ship.location.y - 25,
                    });
                    break;
                case "ArrowDown":
                    this.user.ship.move(this.canvas.ctx, {
                        y: this.user.ship.location.y + 25,
                    });
                    break;
                case "ArrowLeft":
                    this.user.ship.move(this.canvas.ctx, {
                        x: this.user.ship.location.x - 25,
                    });
                    break;
                case "ArrowRight":
                    this.user.ship.move(this.canvas.ctx, {
                        x: this.user.ship.location.x + 25,
                    });
                    break;
                case "Space":
                    this.user.ship.bulletQueue.add(new Bullet({
                        x: this.user.ship.location.x +
                            this.user.ship.figure.width / 2 -
                            5,
                        y: this.user.ship.location.y - 10,
                    }, { width: 10, height: 10 }, "tomato"));
                    break;
            }
        });
        const canvasHeight = this.canvas.element.height;
        let x = 0;
        let y = -canvasHeight + this.user.ship.figure.height + 20;
        const keyFrames = new KeyFrames();
        keyFrames.addKeyFrame(() => {
            var _a, _b;
            if (!this.user.ship.isLoaded || !this.computer.ship.isLoaded)
                return;
            if (!((_a = this.canvas.background) === null || _a === void 0 ? void 0 : _a.isLoaded))
                return;
            const image = document.querySelector(`[src="${this.canvas.backgroundImageUrl}"]`);
            (_b = this.canvas.ctx) === null || _b === void 0 ? void 0 : _b.drawImage(image, x, y, this.canvas.element.width, this.canvas.element.height + 700);
            y += 4;
            if (y > 0) {
                y = -canvasHeight + this.user.ship.figure.height + 20;
            }
            this.user.ship.drawOn(this.canvas.ctx);
            this.computer.ship.drawOn(this.canvas.ctx);
        });
        const queue = [];
        keyFrames.addKeyFrame(() => {
            while (!this.user.ship.bulletQueue.isEmpty()) {
                const bullet = this.user.ship.bulletQueue.delete();
                if (bullet) {
                    queue.push(bullet);
                }
            }
            for (let bullet of queue) {
                bullet.setLocation({ y: bullet.location.y - 4 });
                bullet.drawOn(this.canvas.ctx);
                if (bullet.location.y < 0) {
                    const index = queue.findIndex((el) => el === bullet);
                    queue.splice(index, 1);
                    bullet.removeFrom(this.canvas.ctx, document.querySelector(`[src="${this.user.ship.trailClearSrc}"]`));
                }
            }
        });
        this.control.addController(() => {
        });
        animationFrame.setHandler((time) => {
            keyFrames.play();
            window.requestAnimationFrame(animationFrame.handler);
        });
        this._animationFrame = animationFrame;
        this.run();
    }
    run() {
        if (this._animationFrame) {
            this._animationFrame.start();
        }
    }
    setAnimationFrame(animationFrame) {
        this._animationFrame = animationFrame;
    }
}
new App();
//# sourceMappingURL=app.js.map