<template>

    <div :title="iconObj.title" :style="{color:color}" @click="$emit('click')">
        <customIcon :icon-class="iconObj.icon"></customIcon>
    </div>

</template>
<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import CustomIcon from "@/components/customIcon/Index.vue";

@Component({
    components: {
        CustomIcon
    }
})
export default class tableIcon extends Vue {
    @Prop({
        type: Object,
        default: () => {
            return {};
        },
    })
    iconObj !: { icon: string; title: string }

    @Prop({
        type: String,
        default: '#3D6DCC'
    })
    color!: string
}
</script>

<style scoped lang="scss">
.icon {
    cursor: pointer;
    margin-right: 15px;

    div {
        //margin-right: 15px;

        > i {
            color: #3D6DCC;
            font-size: 16px;
        }
    }
}
</style>
