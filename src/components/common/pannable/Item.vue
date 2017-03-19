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

        select: Function,
    },

    data() {
        return {
            position: Vector2.fromObject(this.passage.position),

            mouseDrag: new PositionTracker(),
            touchDrag: new PositionTracker(),
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
            this.$emit('item-selected', this.passage.pid);
            event.stopPropagation();
        },
        onTouchMove(event) {
            if (this.touchDrag.active) {
                const diff = this.touchDrag.diff(event.touches[0].clientX, event.touches[0].clientY);

                this.position.add(diff);
                this.emitMovement();
                event.stopPropagation();
            }
        },
        onTouchEnd(event) {
            this.stopDragging(event);
        },

        onMouseDown(event) {
            if (event.button === this.dragButton) {
                this.mouseDrag.remember(event.clientX, event.clientY);

                this.$emit('item-selected', this.passage.pid);

                event.preventDefault();
                event.stopPropagation();
            }
        },
        onMouseMove(event) {
            if (this.mouseDrag.active) {
                const diff = this.mouseDrag.diff(event.clientX, event.clientY);

                this.position.add(diff);
                this.emitMovement();

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

            this.emitMovement();
        },

        emitMovement() {
            this.$emit('item-moved', {
                pid: this.passage.pid,
                x: this.position.x,
                y: this.position.y,
            });
        },
    },

    computed: {
        style() {
            return {
                left: `${this.passage.position.x}px`,
                top: `${this.passage.position.y}px`,
            };
        },
    },
};
</script>

<template lang="pug">
.pannable-item(:style="style", :class="{selected: passage.selected}",
    :title="passage.text",
    @touchstart="onTouchStart", @touchmove="onTouchMove", @touchend="onTouchEnd",
    @mousedown="onMouseDown", @mousemove="onMouseMove", @mouseup="onMouseUp")
    h6 {{passage.title}}
    pre {{passage.text}}

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
        overflow: hidden
        cursor: pointer

        &.selected
            color: navy
            z-index: 10 // lift selected items so dragging will not be interrupted by other items

    text-child()
        font-size: 10px
        white-space: pre
        margin: 0.4ex 0.4ex 0.2ex 0.8ex
        &::selection {
            background: none // adding user-select: none breaks marquee
        }

    h6
        text-child()
    pre
        text-child()
</style>