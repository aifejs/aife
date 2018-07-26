<template lang="pug">
    fa-icon.activeIcon.danger.passageTabs-close(icon="window-close", @click="$emit('click')")
</template>

<script>
export default {
    name: 'PassageTabClose',
};
</script>