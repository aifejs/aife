import {Vector2,} from '../../../lib/Vector2';

export class PositionTracker {
    constructor(x = null, y = null) {
        this.v = new Vector2(x, y);
        this.active = false;
    }

    remember(x, y) {
        this.v = new Vector2(x, y);
        this.active = true;
    }

    diff(x, y) {
        const other = new Vector2(x, y);

        const result = other.subtract(this.v);

        this.remember(x, y);

        return result;
    }

    off() {
        this.active = false;
    }
}