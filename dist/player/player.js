import { Ship } from "../canvas/object/ship.js";
export class Player {
    constructor(name) {
        this.id = Date.now();
        this._healthPoint = 100;
        this._ship = new Ship({ x: 0, y: 0 }, { width: 0, height: 0 }, "");
        this.name = name;
    }
    set ship(ship) {
        this._ship = ship;
    }
    get ship() {
        return this._ship;
    }
    set healthPoint(healthPoint) {
        this._healthPoint = healthPoint;
    }
    get healthPoint() {
        return this._healthPoint;
    }
}
//# sourceMappingURL=player.js.map