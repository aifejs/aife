<script>
import {Vector2,} from '../../../lib/Vector2';
import {keyCodeVectors,} from '../../../lib/keyCodeVectors';
import {mouseButtons,} from '../../../lib/mouseButtons';
import {PositionTracker,} from './PositionTracker';

export default {
    name: 'pannable-item',

    props: {
        passage: Object,

        dragButton: {
            type: Number,
            default: mouseButtons.main,
        },
        selectButton: {
            type: Number,
            default: mouseButtons.main,
        },

        offsetByKey: {
            type: Number,
            default: 25,
        },
        offsetByKeyLarge: {
            type: Number,
            default: 25 * 4,
        },
    },

    data() {
        return {
            position: new Vector2(this.passage.position),

            mouseDrag: new PositionTracker(),
            touchDrag: new PositionTracker(),

            selected: false,
        };
    },

    mounted() {
        const stopDragging = this.stopDragging.bind(this);

        document.addEventListener('mouseup', stopDragging, false);
        document.addEventListener('touchend', stopDragging, false);
    },

    methods: {
        onTouchStart(event) {
            this.touchDrag.remember(event.touches[0].clientX, event.touches[0].clientY);
            this.selected = true;
            event.stopPropagation();
        },
        onTouchMove(event) {
            if (this.touchDrag.active) {
                const diff = this.touchDrag.diff(event.touches[0].clientX, event.touches[0].clientY);

                this.position.add(diff);
                event.stopPropagation();
            }
        },
        onTouchEnd(event) {
            this.stopDragging(event);
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

                this.selected = true;

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
            if (event.button === this.dragButton) {
                this.stopDragging(event);
            }
        },

        stopDragging(event) {
            if (this.mouseDrag.active) {
                this.mouseDrag.off();

                event.preventDefault();
                event.stopPropagation();
            }

            if (this.touchDrag.active) {
                this.touchDrag.off();
            }
        },
    },

    computed: {
        style() {
            return {
                left: `${this.position.x}px`,
                top: `${this.position.y}px`,
            };
        },
    },
};
</script>

<template lang="pug">
.pannable-item(:style="style", :class="{selected: passage.selected}",
    @touchstart="onTouchStart", @touchmove="onTouchMove", @touchend="onTouchEnd",
    @keyup="onKeyUp",
    @mousedown="onMouseDown", @mousemove="onMouseMove", @mouseup="onMouseUp")
</template>

<style lang="stylus" rel="stylesheet/stylus">
itemHeight = 100px
itemWidth = 100px

.pannable
    &-item
        position: absolute
        width: itemWidth
        height: itemHeight
        color: olive
        box-shadow: inset 2px 2px, inset -2px -2px
        background-color: alpha(silver, 0.35)
        &.selected
            color: navy
</style>