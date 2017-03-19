import {Vector2,} from './Vector2';

export class Rect {
    get bottomLeft() {
        return this.start;
    }

    get topLeft() {
        return new Vector2(this.start.x, this.end.y);
    }

    get topRight() {
        return this.end;
    }

    get bottomRight() {
        return new Vector2(this.end.x, this.start.y);
    }

    /**
     * @param {Vector2} start
     * @param {Vector2}end
     */
    constructor(start, end) {
        const [normStart, normEnd,] = this.normalize(start, end);

        /** @type Vector2 */
        this.start = normStart;
        /** @type Vector2 */
        this.end = normEnd;
        /** @type Vector2 */
        this.center = this.start.clone().add(this.end).divide(2);
    }

    /**
     * @param {Vector2} start
     * @param {Vector2}end
     * @return {Vector2[]}
     */
    normalize(start, end) {
        if (start.gt(end)) {
            return [end, start,];
        } else {
            return [start, end,];
        }
    }
    /**
     * @param {Vector2} point
     * @return {boolean}
     */
    containsPoint(point) {
        return this.start.lte(point) && this.end.gte(point);
    }

    /**
     * @param {Rect} rect
     * @return {boolean}
     */
    intersectsRect(rect) {
        if (this.containsPoint(rect.center)) {
            return true;
        } else {
            const points = ['bottomLeft', 'topLeft', 'topRight', 'bottomRight',];
            let intersects = false;
            for (let i = 0, len = points.length; i < len; i++) {
                if (this.containsPoint(rect[points[i]])) {
                    intersects = true;
                    break;
                }
            }

            return intersects;
        }
    }

    /**
     *
     * @param {Vector2|Object} start
     * @param {Vector2|Object} size
     * @return {Rect}
     */
    static fromStartAndSize(start, size) {
        const p = new Vector2(start.x, start.y);
        return new Rect(
            p,
            p.clone().add(size)
        );
    }
}