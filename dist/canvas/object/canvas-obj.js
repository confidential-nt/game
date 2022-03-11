export class BaseObject {
    constructor(loc, fig) {
        this._location = loc;
        this._figure = fig;
    }
    get location() {
        return this._location;
    }
    get figure() {
        return this._figure;
    }
    setLocation(location) {
        this._location = Object.assign(Object.assign({}, this._location), location);
    }
    setFigure(figure) {
        this._figure = Object.assign(Object.assign({}, this._figure), figure);
    }
}
export class FigureObjectImpl extends BaseObject {
    constructor(loc, fig, color) {
        super(loc, fig);
        this._color = color;
    }
    get color() {
        return this._color;
    }
    drawOn(ctx) {
        if (this._figure.rotate) {
            ctx.save();
            ctx.rotate(this._figure.rotate * (Math.PI / 180));
        }
        ctx.fillStyle = this._color;
        ctx.fillRect(this._location.x, this._location.y, this._figure.width, this._figure.height);
        if (this._figure.rotate) {
            ctx.restore();
        }
    }
    removeFrom(ctx, image) {
        ctx.drawImage(image, this._location.x, this._location.y, this._figure.width, this._figure.height, this._location.x, this._location.y, this._figure.width, this._figure.height);
    }
}
export class ImageObjectImpl extends BaseObject {
    constructor(loc, fig, url) {
        super(loc, fig);
        this._isLoaded = false;
        this._url = url;
        const img = new Image();
        img.onload = () => {
            this._isLoaded = true;
        };
        img.src = url;
        img.hidden = true;
        document.body.append(img);
    }
    get url() {
        return this._url;
    }
    get isLoaded() {
        return this._isLoaded;
    }
    drawOn(ctx) {
        const img = document.querySelector(`[src="${this._url}"]`);
        const canvas = document.querySelector("#canvas");
        if (this._figure.rotate) {
            ctx.save();
            ctx.translate(canvas.width / 2 + this._figure.width / 2, 120);
            ctx.rotate(this._figure.rotate * (Math.PI / 180));
        }
        ctx.drawImage(img, this._location.x, this._location.y, this._figure.width, this._figure.height);
        if (this._figure.rotate) {
            ctx.restore();
        }
    }
    removeFrom(ctx, image) {
        ctx.drawImage(image, this._location.x, this._location.y, this._figure.width, this._figure.height, this._location.x, this._location.y, this._figure.width, this._figure.height);
    }
}
//# sourceMappingURL=canvas-obj.js.map