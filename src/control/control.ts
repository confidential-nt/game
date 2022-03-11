type KeyListener = (e: KeyboardEvent) => void;

type Controller = () => void;

export class Control {
  private keyListener?: KeyListener;
  private controllers: Controller[] = [];

  constructor() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      this.keyListener && this.keyListener(e);
    });
  }

  run() {
    for (let controller of this) {
      const c = controller! as Controller;
      c();
    }
  }

  setKeyListener(listener: KeyListener) {
    this.keyListener = listener;
  }

  addController(controller: Controller) {
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
        } else {
          return { done: true };
        }
      },
    };
  }
}
