export class AnimationFrame {
    constructor() { }
    get handler() {
        if (this._handler) {
            return this._handler;
        }
    }
    setHandler(handler) {
        this._handler = handler;
    }
    sleep(second) {
        return new Promise((res, rej) => {
            setTimeout(() => res("done"), second * 1000);
        });
    }
    start() {
        window.requestAnimationFrame(this._handler);
    }
}
export class KeyFrames {
    constructor() {
        this.keyFrames = [];
    }
    addKeyFrame(keyFrame) {
        this.keyFrames.push(keyFrame);
    }
    deleteKeyFrame(index) {
        this.keyFrames.splice(index, 1);
    }
    play() {
        for (let keyframe of this) {
            const k = keyframe;
            k();
        }
    }
    [Symbol.iterator]() {
        return {
            current: 0,
            last: this.keyFrames.length - 1,
            keyframes: this.keyFrames,
            next() {
                if (this.current <= this.last) {
                    return { done: false, value: this.keyframes[this.current++] };
                }
                else {
                    return { done: true };
                }
            },
        };
    }
}
//# sourceMappingURL=animation-frame.js.map