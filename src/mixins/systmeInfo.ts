import {Component, Vue} from 'vue-property-decorator';
import {Action, State} from 'vuex-class'

@Component
export default class SystemInfo extends Vue {
    @State('SYS_INFO')
    SYSTEM_INFO!: sys.systemInfo

    $getSystemInfo(): sys.systemInfo {
        return this.SYSTEM_INFO
    }
}
