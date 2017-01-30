<script>
class PositionTracker {
    constructor(x = null, y = null) {
        this.remember(x, y);
    }

    get active() {
        return this.x !== null && this.y !== null;
    }

    remember(x, y) {
        this.x = x;
        this.y = y;
    }

    diff(x, y) {
        const result = {
            x: x - this.x,
            y: y - this.y,
        };

        this.remember(x, y);

        return result;
    }

    off() {
        this.x = null;
        this.y = null;
    }
}

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
            pannablePosition: {
                x: 0,
                y: 0,
            },

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

                this.pannablePosition.x += diff.x;
                this.pannablePosition.y += diff.y;
            }
        },
        onTouchEnd(event) {
            if (this.swipeDrag.active) {
                this.swipeDrag.off();
            }
        },

        onKeyUp({keyCode, shiftKey,}) {
            const offset = shiftKey ? this.offsetByKeyLarge : this.offsetByKey;

            if (keyCode === 39) {
                this.pannablePosition.x += offset;
            }

            if (keyCode === 37) {
                this.pannablePosition.x -= offset;
            }

            if (keyCode === 38) {
                this.pannablePosition.y -= offset;
            }

            if (keyCode === 40) {
                this.pannablePosition.y = offset;
            }
        },

        onMouseDown(event) {
            if (event.button === this.dragButton) {
                this.mouseDrag.remember(event.clientX, event.clientY);

                event.preventDefault();
                event.stopPropagation();
            }
        },
        onMouseMove(event) {
            if (this.mouseDrag.active) {
                const diff = this.mouseDrag.diff(event.clientX, event.clientY);

                this.pannablePosition.x += diff.x;
                this.pannablePosition.y += diff.y;

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