<script>
import {Vector2,} from '../../../lib/Vector2';
import {keyCodeVectors,} from '../../../lib/keyCodeVectors';
import {mouseButtons,} from '../../../lib/mouseButtons';
import {PositionTracker,} from './PositionTracker';
import bgGrid from './BgGrid';
import PannableItem from './Item.vue';

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
            default: mouseButtons.aux,
        },
        selectButton: {
            type: Number,
            default: mouseButtons.main,
        },

        viewportWidth: Number,
        viewportHeight: Number,

        gridSize: {
            type: Number,
            default: 50,
        },
    },

    data() {
        return {
            position: Vector2.zero(),

            mouseDrag: new PositionTracker(),
            touchDrag: new PositionTracker(),
        };
    },

    mounted() {
        document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    },

    methods: {
        onTouchStart(event) {
            this.touchDrag.remember(event.touches[0].clientX, event.touches[0].clientY);
        },
        onTouchMove(event) {
            if (this.touchDrag.active) {
                const diff = this.touchDrag.diff(event.touches[0].clientX, event.touches[0].clientY);

                this.position.add(diff);
            }
        },
        onTouchEnd(event) {
            if (this.touchDrag.active) {
                this.touchDrag.off();
            }
        },

        onKeyUp(event) {
            if (keyCodeVectors.hasOwnProperty(event.keyCode)) {
                const magnitude = event.shiftKey ? this.offsetByKeyLarge : this.offsetByKey;
                const vector = keyCodeVectors[event.keyCode];

                this.position.add(vector.clone().multiply(magnitude));
                event.stopPropagation();
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

                this.position.add(diff);

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
            return `translateX(${this.position.x}px) translateY(${this.position.y}px)`;
        },
    },

    directives: {
        bgGrid,
    },

    components: {
        PannableItem,
    },
};
</script>

<template lang="pug">
.pannable(tabindex="0",
    ":style"="{width: viewportWidth + 'px', height: viewportHeight + 'px',}",
    @touchstart="onTouchStart", @touchmove="onTouchMove", @touchend="onTouchEnd",
    @keyup="onKeyUp",
    @mousedown="onMouseDown", @mousemove="onMouseMove", @mouseup="onMouseUp")
    .pannable-bg(":style"="{transform: bgTransform}", v-bg-grid="{size: gridSize, color: 'silver'}")
        pannable-item(":x"="0", ":y"="0")
        pannable-item(":x"="70", ":y"="70")
</template>

<style lang="stylus" rel="stylesheet/stylus">
canvasWidth = 3000px
canvasHeight = 3000px

.pannable
    position: relative
    overflow: hidden
    outline: 1px solid silver

    &-bg
        position: absolute;
        left: 0//"calc((%s - %s)/2)" % (fieldWidth canvasWidth)
        top: 0//"calc((%s - %s)/2)" % (fieldHeight canvasHeight)
        width: canvasWidth
        height: canvasHeight

        transition: all 150ms linear
</style>