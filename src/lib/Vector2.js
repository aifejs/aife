export class Vector2 {
    get length() {
        return Math.hypot(this.x, this.y);
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Vector2} other
     * @return {Vector2}
     */
    add(other) {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    /**
     * @param {Vector2} other
     * @return {Vector2}
     */
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    /**
     * @param {number} amount
     * @return {Vector2}
     */
    multiply(amount) {
        this.x *= amount;
        this.y *= amount;

        return this;
    }

    /**
     * @param {number} amount
     * @return {Vector2}
     */
    divide(amount) {
        this.x /= amount;
        this.y /= amount;

        return this;
    }

    /**
     * @return {Vector2}
     */
    unit() {
        return this.divide(this.length);
    }

    /**
     * @return {Vector2}
     */
    reverse() {
        return this.multiply(-1);
    }

    /**
     * @param {Vector2} other
     * @return {number}
     */
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * @param {Vector2} other
     * @return {number}
     */
    angleBetween(other) {
        const dot = this.dot(other);
        const angleCos = dot / (this.length * other.length);

        return Math.acos(angleCos);
    }

    /**
     * @param {Vector2} other
     * @return {boolean}
     */
    lt(other) {
        return this.length < other.length;
    }

    /**
     * @param {Vector2} other
     * @return {boolean}
     */
    lte(other) {
        return this.length <= other.length;
    }

    /**
     * @param {Vector2} other
     * @return {boolean}
     */
    gt(other) {
        return this.length > other.length;
    }

    /**
     * @param {Vector2} other
     * @return {boolean}
     */
    gte(other) {
        return this.length > other.length;
    }

    /**
     * @param {Vector2} other
     * @return {boolean}
     */
    eq(other) {
        return this.x === other.x && this.y === other.y;
    }

    /**
     * @return {Vector2}
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    toString() {
        return `(${this.x},${this.y})`;
    }

    /**
     * @return {Vector2}
     */
    static zero() {
        return new Vector2(0, 0);
    }

    /**
     * @return {Vector2}
     */
    static up() {
        return new Vector2(0, 1);
    }

    /**
     * @return {Vector2}
     */
    static right() {
        return new Vector2(1, 0);
    }

    /**
     * @return {Vector2}
     */
    static down() {
        return new Vector2(0, -1);
    }

    /**
     * @return {Vector2}
     */
    static left() {
        return new Vector2(-1, 0);
    }

    /**
     * @param {DOMRect} domRect
     * @param xName
     * @param yName
     * @return {Vector2}
     */
    static fromDOMRect(domRect, xName = 'left', yName = 'top') {
        return new Vector2(domRect[xName], domRect[yName]);
    }

    static fromObject({x, y,}) {
        return new Vector2(x, y);
    }
}