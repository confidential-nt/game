import { Background } from "./object/background.js";
export class Canvas {
    constructor(root, backgrondUrl) {
        this.root = root;
        this.element = document.createElement("canvas");
        this.root.insertAdjacentElement("beforeend", this.element);
        this.element.id = "canvas";
        const rect = this.element.getBoundingClientRect();
        this.element.width = rect.width;
        this.element.height = rect.height;
        this.ctx = this.element.getContext("2d");
        if (backgrondUrl) {
            this.setBackgroundImage(new Background({ x: 0, y: 0 }, { width: this.element.width, height: this.element.height }, backgrondUrl));
        }
    }
    setBackgroundImage(background) {
        this._backgroundImageUrl = background.url;
        this._background = background;
        background.drawOn(this.ctx);
    }
    get background() {
        if (this._background)
            return this._background;
    }
    get backgroundImageUrl() {
        return this._backgroundImageUrl;
    }
}
//# sourceMappingURL=canvas.js.map