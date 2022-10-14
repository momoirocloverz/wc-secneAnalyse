<template>
    <!-- <view-anim> -->
        <router-view v-bind="$attrs" v-on="$listeners" :key="$route.path"/>
    <!-- </view-anim> -->
</template>

<script lang="ts">
//替换router-view提供切换动画的效果
// import ViewAnim from "./ViewAnim.vue";
import {Component, Vue} from 'vue-property-decorator';

@Component({
    name: 'router-view-anim',
    // components: {ViewAnim}
})
export default class RouterViewAnim extends Vue {

}
</script>

<style scoped lang="scss">
</style>