import { Ship } from "../canvas/object/ship";

export class Player {
  readonly name: string;
  readonly id: number = Date.now();
  private _ship: Ship = new Ship({ x: 0, y: 0 }, { width: 0, height: 0 }, "");

  constructor(name: string) {
    this.name = name;
  }

  set ship(ship: Ship) {
    this._ship = ship;
  }

  get ship(): Ship {
    return this._ship;
  }
}
