import { Canvas } from "../canvas.js";

export type AnimationFrameHandler = (time: DOMHighResTimeStamp) => void;

type KeyFrame = () => void;

export class AnimationFrame {
  private _handler?: AnimationFrameHandler;
  // private keyFrames -> 연결리스트? 제네레이터? 프로미즈? 아님 기타 다른 방법? 흠..이걸 따로 KeyFrames 객체로?

  constructor() {}

  get handler(): AnimationFrameHandler | undefined {
    if (this._handler) {
      return this._handler;
    }
  }

  setHandler(handler: AnimationFrameHandler) {
    this._handler = handler;
  }

  sleep(second: number) {
    return new Promise((res, rej) => {
      setTimeout(() => res("done"), second * 1000);
    });
  }

  start() {
    window.requestAnimationFrame(this._handler! as AnimationFrameHandler);
  }
}

export class KeyFrames {
  private keyFrames: KeyFrame[] = [];

  addKeyFrame(keyFrame: KeyFrame) {
    this.keyFrames.push(keyFrame);
  }

  deleteKeyFrame(index: number) {
    this.keyFrames.splice(index, 1);
  }

  play() {
    for (let keyframe of this) {
      const k = keyframe! as KeyFrame;
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
        } else {
          return { done: true };
        }
      },
    };
  }
}
