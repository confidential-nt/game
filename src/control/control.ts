type KeyListener = (e: KeyboardEvent) => void;

export class Control {
  private keyListener?: KeyListener;
  constructor() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      this.keyListener && this.keyListener(e);
    });
  }

  setKeyListener(listener: KeyListener) {
    this.keyListener = listener;
  }
}
