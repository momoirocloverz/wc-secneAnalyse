<template>
    <i class="icon" :class="`icon-${iconClass}`"></i>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class CustomIcon extends Vue {
    @Prop({
        type: String
    })
    iconClass!: string
}
</script>

<style scoped lang="scss">

</style>