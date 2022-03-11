export class Control {
    constructor() {
        this.controllers = [];
        window.addEventListener("keydown", (e) => {
            this.keyListener && this.keyListener(e);
        });
    }
    run() {
        for (let controller of this) {
            const c = controller;
            c();
        }
    }
    setKeyListener(listener) {
        this.keyListener = listener;
    }
    addController(controller) {
        this.controllers.push(controller);
    }
    [Symbol.iterator]() {
        return {
            current: 0,
            last: this.controllers.length - 1,
            controllers: this.controllers,
            next() {
                if (this.current <= this.last) {
                    return { done: false, value: this.controllers[this.current++] };
                }
                else {
                    return { done: true };
                }
            },
        };
    }
}
//# sourceMappingURL=control.js.map