<script>
import {Vector2,} from '../../../lib/Vector2';

class PositionTracker {
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

const keyCodeVectors = {
    39: Vector2.right(),
    37: Vector2.left(),
    38: Vector2.down(),
    40: Vector2.up(),
};

export default {
    name: 'pannable-container',

    props: {
        offsetByKey: {
            type: Number,
            default: 25,
        },
        offsetByKeyLarge: {
            type: Number,
            default: 25 * 4,
        },
        dragButton: {
            type: Number,
            default: 1, // 1 for middle, 2 for right
        },
    },

    data() {
        return {
            pannablePosition: Vector2.zero(),

            mouseDrag: new PositionTracker(),
            swipeDrag: new PositionTracker(),
        };
    },

    mounted() {
        document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    },

    methods: {
        onTouchStart(event) {
            this.swipeDrag.remember(event.touches[0].clientX, event.touches[0].clientY);
        },
        onTouchMove(event) {
            if (this.swipeDrag.active) {
                const diff = this.swipeDrag.diff(event.touches[0].clientX, event.touches[0].clientY);

                this.pannablePosition.add(diff);
            }
        },
        onTouchEnd(event) {
            if (this.swipeDrag.active) {
                this.swipeDrag.off();
            }
        },

        onKeyUp(event) {
            if (keyCodeVectors.hasOwnProperty(event.keyCode)) {
                const magnitude = event.shiftKey ? this.offsetByKeyLarge : this.offsetByKey;
                const vector = keyCodeVectors[event.keyCode];

                this.pannablePosition.add(vector.clone().multiply(magnitude));
            }
        },

        onMouseDown(event) {
            if (event.button === this.dragButton) {
                this.mouseDrag.remember(event.clientX, event.clientY);
                this.$el.focus();

                event.preventDefault();
                event.stopPropagation();
            }
        },
        onMouseMove(event) {
            if (this.mouseDrag.active) {
                const diff = this.mouseDrag.diff(event.clientX, event.clientY);

                this.pannablePosition.add(diff);

                event.preventDefault();
                event.stopPropagation();
            }
        },
        onMouseUp(event) {
            if (this.mouseDrag.active) {
                this.mouseDrag.off();

                event.preventDefault();
                event.stopPropagation();
            }
        },
    },

    computed: {
        bgTransform() {
            return `translateX(${this.pannablePosition.x}px) translateY(${this.pannablePosition.y}px)`;
        },
    },
};
</script>

<template lang="pug">
.pannable(tabindex="0",
    @touchstart="onTouchStart", @touchmove="onTouchMove", @touchend="onTouchEnd",
    @keyup="onKeyUp",
    @mousedown="onMouseDown", @mousemove="onMouseMove", @mouseup="onMouseUp")
    .pannable-bg(":style"="{transform: bgTransform}")
    .pannable-item(tabindex="0")
</template>

<style lang="stylus" rel="stylesheet/stylus">
fieldWidth = 300px
fieldHeight = 300px
canvasWidth = 3000px
canvasHeight = 3000px
itemHeight = 40px
itemWidth = 60px

.pannable
    position: relative
    overflow: hidden
    width: fieldWidth
    height: fieldHeight
    outline: 1px solid silver

    &-bg
        position: absolute;
        left: "calc((%s - %s)/2)" % (fieldWidth canvasWidth)
        top: "calc((%s - %s)/2)" % (fieldHeight canvasHeight)
        width: canvasWidth
        height: canvasHeight
        background-image: url('http://66.media.tumblr.com/c6eaa1ead770be2c765028ad082609db/tumblr_inline_nn85trR7U21rewzq7_500.png')
        transition: all 150ms linear

    &-item
        position: absolute
        width: itemWidth
        height: itemHeight
        outline: 2px solid olive
        top: ((canvasHeight - itemHeight)/2)px
        left: ((canvasWidth - itemWidth)/2)px
        &:focus
            outline: 2px solid navy
</style>