<script>
import {mapActions, mapGetters,} from 'vuex';

import {Vector2,} from '../../../lib/Vector2';
import {keyCodeVectors,} from '../../../lib/keyCodeVectors';
import {mouseButtons,} from '../../../lib/mouseButtons';
import {PositionTracker,} from './PositionTracker';
import bgGrid from './BgGrid';
import PannableItem from './Item.vue';
import PannableMarquee from './Marquee.vue';

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

        gridSize: {
            type: Number,
            default: 100,
        },

        passages: {
            type: Array,
        },
    },

    data() {
        return {
            position: Vector2.zero(),

            dragMode: false,
            mouseDrag: new PositionTracker(),
            touchDrag: new PositionTracker(),

            marqueeMode: false,
            marqueeStart: Vector2.zero(),
            marqueeEnd: Vector2.zero(),

            offset: Vector2.zero(),

            isHovered: false,
        };
    },

    mounted() {
        document.addEventListener('mouseup', this.onMouseUp.bind(this), false);

        // listening keyup on element proves to be error prone, since in requires element to have focus
        document.addEventListener('keyup', this.onDocumentKeyUp.bind(this), false);

        this.offset = Vector2.fromDOMRect(this.$el.getBoundingClientRect()); // TODO: update on dimension changes
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

        onDocumentKeyUp(event) {
            if (this.isHovered) {
                this.onKeyUp(event);
            }
        },

        onKeyUp(event) {
            if (keyCodeVectors.hasOwnProperty(event.keyCode)) {
                const magnitude = event.shiftKey ? this.offsetByKeyLarge : this.offsetByKey;
                const vector = keyCodeVectors[event.keyCode].clone().multiply(magnitude);

                if (this.hasSelectedPassages) {
                    this.moveSelectedPassages(vector);
                } else {
                    this.position.add(vector);
                }

                event.stopPropagation();
                event.preventDefault();
            }
        },

        onMouseDown(event) {
            if (event.button === this.dragButton) {
                this.mouseDrag.remember(event.clientX, event.clientY);
                this.$el.focus();
                this.dragMode = true;

                event.preventDefault();
                event.stopPropagation();
            } else if (event.button === this.selectButton) {
                this.marqueeMode = true;
                this.marqueeStart = new Vector2(event.clientX, event.clientY)
                    .subtract(this.offset)
                    .subtract(this.position);
                this.marqueeEnd = this.marqueeStart.clone();
            }
        },
        onMouseMove(event) {
            if (event.button === this.dragButton) {
                if (this.mouseDrag.active) {
                    const diff = this.mouseDrag.diff(event.clientX, event.clientY);

                    this.position.add(diff);

                    event.preventDefault();
                    event.stopPropagation();
                }
            } else if (event.button === this.selectButton) {
                if (this.marqueeMode) {
                    this.marqueeEnd = new Vector2(event.clientX, event.clientY)
                        .subtract(this.offset)
                        .subtract(this.position);

                    this._selectByMarquee();
                }
            }
        },
        onMouseUp(event) {
            if (event.button === this.dragButton) {
                if (this.mouseDrag.active) {
                    this.mouseDrag.off();
                    this.dragMode = false;

                    event.preventDefault();
                    event.stopPropagation();
                }
            } else if (event.button === this.selectButton) {
                this.marqueeMode = false;

                this._selectByMarquee();
            }
        },

        _selectByMarquee() {
            this.selectPassagesByMarquee({
                start: this.marqueeStart,
                end: this.marqueeEnd,
            });
        },

        ...mapActions([
            'selectPassage',
            'movePassage',
            'moveSelectedPassages',
            'selectPassagesByMarquee',
        ]),
    },

    computed: {
        bgTransform() {
            return `translateX(${this.position.x}px) translateY(${this.position.y}px)`;
        },

        ...mapGetters([
            'hasSelectedPassages',
        ]),
    },

    directives: {
        bgGrid,
    },

    components: {
        PannableItem,
        PannableMarquee,
    },
};
</script>

<template lang="pug">
.pannable(tabindex="-1",
    @touchstart="onTouchStart", @touchmove="onTouchMove", @touchend="onTouchEnd",
    @mouseenter="isHovered = true", @mouseleave="isHovered = false",
    @mousedown="onMouseDown", @mousemove="onMouseMove", @mouseup="onMouseUp")
    .pannable-bg(:style="{transform: bgTransform}", v-bg-grid="{size: gridSize, color: 'gray'}")
        pannable-marquee(:visible="marqueeMode", :start="marqueeStart.lt(marqueeEnd) ? marqueeStart : marqueeEnd", :end="marqueeStart.lt(marqueeEnd) ? marqueeEnd : marqueeStart")
        pannable-item(v-for="passage in passages", :passage="passage", :key="passage.pid", @item-selected="selectPassage", @item-moved="movePassage")
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
        left: 0
        top: 0
        width: canvasWidth
        height: canvasHeight

        transition: all 150ms linear
</style>