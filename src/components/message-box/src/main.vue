<template>
    <transition name="msgbox-fade">
        <div
            class="el-message-box__wrapper newMessage"
            tabindex="-1"
            v-show="visible"
            @click.self="handleWrapperClick"
            role="dialog"
            aria-modal="true"
            :aria-label="title || 'dialog'">
            <div class="el-message-box" :class="[customClass, center && 'el-message-box--center']">
                <div class="el-message-box__header" v-if="title !== null">
                    <div class="el-message-box__title">
                        <div
                            :class="['el-message-box__status', icon]"
                            v-if="icon && center">
                        </div>
                        <span>{{ title }}</span>
                    </div>
                    <button
                        type="button"
                        class="el-message-box__headerbtn"
                        aria-label="Close"
                        v-if="showClose"
                        @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
                        @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')">
                        <i class="el-message-box__close el-icon-close"></i>
                    </button>
                </div>
                <div class="el-message-box__content">
                    <div class="el-message-box__container">
                        <div class="el-message-box__message" v-if="message !== ''">
                            <slot>
                                <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                                <p v-else v-html="message"></p>
                            </slot>
                        </div>
                    </div>
                    <div class="el-message-box__input" v-show="showInput">
                        <el-input
                            v-model="inputValue"
                            :type="inputType"
                            @keydown.enter.native="handleInputEnter"
                            :placeholder="inputPlaceholder"
                            ref="input"></el-input>
                        <div class="el-message-box__errormsg"
                             :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{
                                editorErrorMessage
                            }}
                        </div>
                    </div>
                </div>
                <div class="el-message-box__btns el-message-box__btns2">
                    <div class="left-button-text" @click="handleAction('doClose')">
                        <span v-if="leftButtonTextShow && type=== 'large'">{{ leftButtonText }}</span>
                    </div>
                    <div>
                        <el-button
                            class="left_btn"
                            :loading="cancelButtonLoading"
                            :class="[ cancelButtonClasses ]"
                            v-if="showCancelButton"
                            :round="roundButton"
                            size="small"
                            @click.native="handleAction('cancel')"
                            @keydown.enter="handleAction('cancel')">
                            {{ cancelButtonText || t('el.messagebox.cancel') }}
                        </el-button>
                        <el-button
                            class="right_btn"
                            :loading="confirmButtonLoading"
                            ref="confirm"
                            :class="type=='warning'?'confirmButtonWarn':type=='primary'?'confirmButtonPrimary':
                        type=='large'? 'largeButtonPrimary': 'confirmButtonClasses'"
                            v-show="showConfirmButton"
                            :round="roundButton"
                            size="small"
                            @click.native="handleAction('confirm')"
                            @keydown.enter="handleAction('confirm')">
                            {{ confirmButtonText || t('el.messagebox.confirm') }}
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/babel">
import Popup from 'element-ui/src/utils/popup';
import Locale from 'element-ui/src/mixins/locale';
import ElInput from 'element-ui/packages/input';
import ElButton from 'element-ui/packages/button';
import { addClass, removeClass } from 'element-ui/src/utils/dom';
import { t } from 'element-ui/src/locale';
import Dialog from 'element-ui/src/utils/aria-dialog';

let messageBox;
let typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
    primary: 'primary',
    large: 'large'
};

export default {
    mixins: [Popup, Locale],

    props: {
        modal: {
            default: true
        },
        lockScroll: {
            default: true
        },
        showClose: {
            type: Boolean,
            default: true
        },
        closeOnClickModal: {
            default: true
        },
        closeOnPressEscape: {
            default: true
        },
        closeOnHashChange: {
            default: true
        },
        center: {
            default: false,
            type: Boolean
        },
        roundButton: {
            default: false,
            type: Boolean
        },
        leftButtonTextShow: {
            default: false,
            type: Boolean
        }
    },

    components: {
        ElInput,
        ElButton
    },

    computed: {
        icon() {
            const { type, iconClass } = this;
            return iconClass || (type && typeMap[type] ? `el-icon-${typeMap[type]}` : '');
        },

        confirmButtonClasses() {
            return `el-button--primary ${this.confirmButtonClass}`;
        },
        cancelButtonClasses() {
            return `${this.cancelButtonClass}`;
        }
    },

    methods: {
        getSafeClose() {
            const currentId = this.uid;
            return () => {
                this.$nextTick(() => {
                    if (currentId === this.uid) this.doClose();
                });
            };
        },
        doClose() {
            if (!this.visible) return;
            this.visible = false;
            this._closing = true;

            this.onClose && this.onClose();
            messageBox.closeDialog(); // 解绑
            if (this.lockScroll) {
                setTimeout(this.restoreBodyStyle, 200);
            }
            this.opened = false;
            this.doAfterClose();
            setTimeout(() => {
                if (this.action) this.callback(this.action, this);
            });
        },

        handleWrapperClick() {
            if (this.closeOnClickModal) {
                this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel');
            }
        },

        handleInputEnter() {
            if (this.inputType !== 'textarea') {
                return this.handleAction('confirm');
            }
        },

        handleAction(action) {
            if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
                return;
            }
            this.action = action;
            if (typeof this.beforeClose === 'function') {
                this.close = this.getSafeClose();
                this.beforeClose(action, this, this.close);
            } else {
                this.doClose();
            }
        },

        validate() {
            if (this.$type === 'prompt') {
                const inputPattern = this.inputPattern;
                if (inputPattern && !inputPattern.test(this.inputValue || '')) {
                    this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
                    addClass(this.getInputElement(), 'invalid');
                    return false;
                }
                const inputValidator = this.inputValidator;
                if (typeof inputValidator === 'function') {
                    const validateResult = inputValidator(this.inputValue);
                    if (validateResult === false) {
                        this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
                        addClass(this.getInputElement(), 'invalid');
                        return false;
                    }
                    if (typeof validateResult === 'string') {
                        this.editorErrorMessage = validateResult;
                        addClass(this.getInputElement(), 'invalid');
                        return false;
                    }
                }
            }
            this.editorErrorMessage = '';
            removeClass(this.getInputElement(), 'invalid');
            return true;
        },
        getFirstFocus() {
            const btn = this.$el.querySelector('.el-message-box__btns .el-button');
            const title = this.$el.querySelector('.el-message-box__btns .el-message-box__title');
            return btn || title;
        },
        getInputElement() {
            const inputRefs = this.$refs.input.$refs;
            return inputRefs.input || inputRefs.textarea;
        },
        handleClose() {
            this.handleAction('close');
        }
    },

    watch: {
        inputValue: {
            immediate: true,
            handler(val) {
                this.$nextTick(_ => {
                    if (this.$type === 'prompt' && val !== null) {
                        this.validate();
                    }
                });
            }
        },

        visible(val) {
            if (val) {
                this.uid++;
                if (this.$type === 'alert' || this.$type === 'confirm') {
                    this.$nextTick(() => {
                        this.$refs.confirm.$el.focus();
                    });
                }
                this.focusAfterClosed = document.activeElement;
                messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
            }

            // prompt
            if (this.$type !== 'prompt') return;
            if (val) {
                setTimeout(() => {
                    if (this.$refs.input && this.$refs.input.$el) {
                        this.getInputElement().focus();
                    }
                }, 500);
            } else {
                this.editorErrorMessage = '';
                removeClass(this.getInputElement(), 'invalid');
            }
        }
    },

    mounted() {
        this.$nextTick(() => {
            if (this.closeOnHashChange) {
                window.addEventListener('hashchange', this.close);
            }
        });
    },

    beforeDestroy() {
        if (this.closeOnHashChange) {
            window.removeEventListener('hashchange', this.close);
        }
        setTimeout(() => {
            messageBox.closeDialog();
        });
    },

    data() {
        return {
            uid: 1,
            title: undefined,
            message: '',
            type: '',
            iconClass: '',
            customClass: '',
            showInput: false,
            inputValue: null,
            inputPlaceholder: '',
            inputType: 'text',
            inputPattern: null,
            inputValidator: null,
            inputErrorMessage: '',
            showConfirmButton: true,
            showCancelButton: false,
            action: '',
            confirmButtonText: '',
            cancelButtonText: '',
            leftButtonText: '',
            confirmButtonLoading: false,
            cancelButtonLoading: false,
            confirmButtonClass: '',
            confirmButtonDisabled: false,
            cancelButtonClass: '',
            editorErrorMessage: null,
            callback: null,
            dangerouslyUseHTMLString: false,
            focusAfterClosed: null,
            isOnComposition: false,
            distinguishCancelAndClose: false
        };
    }
};
</script>
<style scoped lang="scss">
.newMessage {
    .el-message-box {
        border: 0;
    }

    .el-message-box__btns2 {

        display: flex;
        justify-content: space-between;

        .left-button-text {
            color: #EE544D;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
            line-height: 40px;
        }

        .left_btn {
            width: 70px;
            height: 40px;
            font-size: 14px;
            line-height: normal;
        }

        .right_btn {
            width: 100px;
            height: 40px;
            font-size: 14px;
            line-height: normal;
        }

        .confirmButtonWarn {
            background: #EE544D;
            color: #FFFFFF;
            border: 1px solid #D44B44;

            &:hover {
                background-color: rgba(212, 75, 68, 0.9);
            }
        }

        .confirmButtonPrimary {
            background: #2D57CC;
            color: #FFFFFF;
            border: 1px solid #2D57CC;
            width: 70px;

            &:hover {
                background-color: rgba(45, 87, 204, 0.9);
            }
        }

        .largeButtonPrimary {
            background: #2D57CC;
            color: #FFFFFF;
            border: 1px solid #2D57CC;
            width: 100px;

            &:hover {
                background-color: rgba(45, 87, 204, 0.9);
            }
        }
    }

    .el-message-box__header {
        background: #DBDBDB;
        display: flex;
        align-items: center;
        padding: 15px 20px;

        span {
            color: #000000;
            font-size: 14px;
            font-weight: 400;
        }

        .el-message-box__title {
            display: flex;
            align-items: center;
        }

        .el-message-box__headerbtn .el-message-box__close {
            color: #000000;
        }
    }

    .el-message-box__content {
        padding: 38px 20px;

        .el-message-box__message p {
            color: #505050;
            font-size: 13px;
        }
    }
}
</style>
