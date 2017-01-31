export class Vector2 {
    get length() {
        return Math.hypot(this.x, this.y);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    multiply(amount) {
        this.x *= amount;
        this.y *= amount;

        return this;
    }

    divide(amount) {
        this.x /= amount;
        this.y /= amount;

        return this;
    }

    unit() {
        return this.divide(this.length);
    }

    reverse() {
        return this.multiply(-1);
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    angleBetween(other) {
        const dot = this.dot(other);
        const angleCos = dot / (this.length * other.length);

        return Math.acos(angleCos);
    }

    lt(other) {
        return this.length < other.length;
    }

    lte(other) {
        return this.length <= other.length;
    }

    gt(other) {
        return this.length > other.length;
    }

    gte(other) {
        return this.length > other.length;
    }

    eq(other) {
        return this.x === other.x && this.y === other.y;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    static Zero() {
        return new Vector2(0, 0);
    }

    static Up() {
        return new Vector2(0, 1);
    }

    static Right() {
        return new Vector2(1, 0);
    }

    static Down() {
        return new Vector2(0, -1);
    }

    static Left() {
        return new Vector2(-1, 0);
    }
}