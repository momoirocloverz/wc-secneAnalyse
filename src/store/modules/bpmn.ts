/**
 * bpmn相关配置
 */
export default {
    namespaced: true,
    state: {
        scale:1,
        nodeInfo:[]
            // userName: '张亚鹏',
            // orgName: '绍兴市移民管理机构',
            // auditStatus: '未通过',
            // auditText: '填写内容不合格，请完善！',
            // timeStatus: '已超时',
            // timeText: '2021-08-07 09:00',
            // take: '72h5m',
            // tips: '3'
    },
    getters: {},
    mutations: {
        scaleBig(state:any){
            state.scale=state.scale + 0.05
        },
        scaleSmall(state:any){
            state.scale=state.scale - 0.05;
        },
        scaleReduction(state:any){
            state.scale = 1;
        },
        setNodeInfo(state:any,data:any) {
            state.nodeInfo.push(data)
        }
    },
    actions: {}
}