<template>
    <router-view-anim></router-view-anim>
</template>
<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import RouterViewAnim from "@/components/RouterViewAnim.vue";

@Component({
    components: {
        RouterViewAnim
    }
})
export default class System extends Vue {
}
</script>

<style scoped lang="scss">
    .router-view-anim {
        width: 100%;
        height: 100%;
    }
</style>
