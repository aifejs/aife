<script>
    import {Vector2,} from '../../../lib/Vector2';
    import {keyCodeVectors,} from '../../../lib/keyCodeVectors';
    import {mouseButtons,} from '../../../lib/mouseButtons';
    import {PositionTracker,} from './PositionTracker';

    export default {
        name: 'pannable-marquee',

        props: {
            visible: {
                type: Boolean,
                default: false,
            },

            start: Vector2,
            end: Vector2,
        },

        computed: {
            style() {
                return {
                    left: `${this.start.x}px`,
                    top: `${this.start.y}px`,

                    width: `${this.end.x - this.start.x}px`,
                    height: `${this.end.y - this.start.y}px`,
                };
            },
        },
    };
</script>

<template lang="pug">
.pannable-marquee(:class="{visible: visible,}", :style="style")
</template>

<style lang="stylus" rel="stylesheet/stylus">
.pannable
    &-marquee
        position: absolute
        border: 2px dashed navy
        display: none
        background-color: alpha(silver, 0.65)
        &.visible
            display: block
</style>