<template>
    <div class="status-wrap">
        <span v-if="title" class="status-title">
             <i class="circle" :class="title"></i>
            {{ matchingType.title }}
        </span>
        <span v-else>-</span>
    </div>
</template>

<script>
export default {
    name: "status",
    props: {
        title: {
            title: String,
            default: ''
        },
    },
    data() {
        return {
            config: {
                DRAFT: {
                    title: "草稿"
                },
                SENDED: {
                    title: "已发送"
                },
                unsubmitted: {
                    title: "未提交"
                },
                wait_audit: {
                    title: "待审批"
                },
                passed: {
                    title: "已通过"
                },
                not_pass: {
                    title: "未通过"
                },
                un_formulate: {
                    title: "未编制"
                },
                formulating: {
                    title: "编制中"
                },
                submitted: {
                    title: "已报送"
                },
                auditing: {
                    title: "审核中"
                },
                audited: {
                    title: "已审核"
                },
                other: {
                    title: "其他"
                },
            }
        }
    },
    computed: {
        matchingType() {
            let c = this.config[this.title];
            if (c) {
                return c;
            } else {
                return {
                    title: '-'
                };
            }
        }
    }
}
</script>

<style scoped lang="scss">
.status-wrap {
    font-size: 13px;
    display: inline-block;
    color: #505050;

    .circle {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: $warning;
        border-radius: 50%;
        margin-right: 4px;
    }

    .status-title {
        display: flex;
        align-items: center;
    }

    .SENDED, .passed {
        background: #12B546;
    }

    .DRAFT, .wait_audit, .unsubmitted {
        background: #E8B315;
    }

    .not_pass {
        background: #D9001B;
    }
}
</style>
