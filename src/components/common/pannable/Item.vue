<script>
import {Vector2,} from '../../../lib/Vector2';
import {keyCodeVectors,} from '../../../lib/keyCodeVectors';
import {mouseButtons,} from '../../../lib/mouseButtons';
import {PositionTracker,} from './PositionTracker';

export default {
    name: 'pannable-item',

    props: {
        x: Number,
        y: Number,

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
            position: new Vector2(this.x, this.y),

            mouseDrag: new PositionTracker(),
            touchDrag: new PositionTracker(),

            selected: false,
        };
    },

    mounted() {
        document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    },

    methods: {
        onTouchStart(event) {
            this.touchDrag.remember(event.touches[0].clientX, event.touches[0].clientY);
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
            if (event.button === this.dragButton) {
                if (this.mouseDrag.active) {
                    this.mouseDrag.off();

                    event.preventDefault();
                    event.stopPropagation();
                }
            } else if (event.button === this.selectButton) {
                this.selected = !this.selected;
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
.pannable-item(":style"="style", ":class"="{selected: selected}",
    @touchstart="onTouchStart", @touchmove="onTouchMove", @touchend="onTouchEnd",
    @keyup="onKeyUp",
    @mousedown="onMouseDown", @mousemove="onMouseMove", @mouseup="onMouseUp")
</template>

<style lang="stylus" rel="stylesheet/stylus">
itemHeight = 40px
itemWidth = 60px

.pannable
    &-item
        position: absolute
        width: itemWidth
        height: itemHeight
        color: olive;
        box-shadow: inset 2px 2px, inset -2px -2px;
        &.selected
            color: navy
</style>