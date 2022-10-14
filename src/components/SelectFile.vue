<template>
    <div class="upload-file" :class="disabled?'disabled':''">
        <el-upload :before-upload="handleUpload"
                   v-if="!disabled"
                   :accept="accept"
                   @click.native="onClick"
                   :multiple="multiple"
                   :drag="drag"
                   action="//localhost">
            <slot>
                <el-button type="primary" icon="ios-link" class="btn">{{ title }}</el-button>
            </slot>
        </el-upload>
        <div class="file-list" v-if="showFileList">
            <div class="file-item" @click="download(item)" v-for="(item,index) in showFileShow" :key="index">
                <i class="el-icon-link"></i>
                {{ item.name }}
                <i class="el-icon-close" @click.stop="removeFile(item)"
                   v-if="!disabled&&isShowDel"
                   style="color: #CC0000;"></i>
            </div>
        </div>
    </div>

</template>

<script>
// import {ajaxDownload} from '@/util/apiUtil'

export default {
    name: "selectFile",
    props: {
        //文字
        title: {
            type: String,
            default: '上传附件'
        },
        //选择的文件类型
        accept: {
            type: String,
            default: '.doc,.docx,.pdf'
        },
        showFileList: {
            type: Boolean,
            default: true
        },
        //输出需要上传的文件
        outFiles: [File, Array],
        //需要回显的文件列表 格式:{name:'文件名',path:'路径名'}
        inFiles: {
            type: Array,
            default: () => {
                return []
            }
        },
        //删除的回显文件对象列表
        delInFiles: {
            type: Array,
            default: () => {
                return []
            }
        },
        isDownload: {
            type: Boolean,
            default: true
        },
        //是否多选
        multiple: {
            type: Boolean,
            default: false
        },
        drag: {
            type: Boolean,
            default: false
        },
        isShowDel: {
            type: Boolean,
            default: true
        },
        disabled: Boolean
    },
    data() {
        return {
            //原生File对象
            fileList: []
        }
    },
    computed: {
        //显示的文件列表
        showFileShow() {
            if (!this.multiple && this.fileList.length) {
                return [...this.fileList]
            }
            return [...this.inFiles, ...this.fileList];
        }
    },
    methods: {
        //点击选择文件时清除之前选择的所有文件,不动回显的文件列表
        onClick() {
            if (!this.multiple) {
                this.fileList = [];
            }
        },
        download(file) {
            this.$emit('click-file-name', file);
            if (!this.isDownload) {
                return;
            }
            //todo 选择的文件暂时不支持点击下载
            if (!(file instanceof File)) {
                // ajaxDownload('/file/download', {path: file.path, fileName: file.name + file.suffix})
            }
        },
        removeFile(file) {
            //原生对象直接移除文件列表,不是原生对象添加到移除列表中
            if (file instanceof File) {
                const fileList = this.fileList;
                fileList.splice(fileList.indexOf(file), 1);
            } else {
                const inFiles = this.inFiles;
                inFiles.splice(inFiles.indexOf(file), 1);
                this.delInFiles.push(file);
                this.$emit('update:delInFiles', this.delInFiles);
            }
        },
        handleUpload(file) {
            //todo 验证文件;
            this.fileList.push(file);
            return false
        },
        clearFiles() {
            this.fileList = [];
        }
    },
    watch: {
        fileList(data) {
            if (this.multiple) {
                this.$emit('update:outFiles', data);
            } else {
                this.$emit('update:outFiles', data[0]);
            }
        }
    }
}
</script>

<style scoped lang="scss">

.upload-file {
    > div {
        //line-height: 36px;
        height: 36px;
    }

    &.disabled {
        .file-list {
            .file-item {
                margin-left: 2rem;
            }
        }
    }

    .ivu-upload {
        display: inline-block;
    }

    .file-list {
        display: inline-block;

        .file-item {
            display: inline-block;
            margin-left: 5rem;
            color: $blue;
            font-size: 1.3rem;
            cursor: pointer;
        }
    }
}

</style>