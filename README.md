# wc-scene-analysis-page
# 文成农业场景分析

## [版本更新日志](/CHANGELOG.md)

## 命令相关
* `yarn serve` 开发环境启动    
* `yarn build:pst` 测试环境打包    
* `yarn build:demo` 演示环境打包    
* `yarn build` 生产环境打包    
* `yarn create-service-type`更新接口类型(如果格式有问题,先到easymock上删除所有的接口,然后再重新同步)    

## 约定
* 系统需要适配全局变量$large(1024px)宽度屏幕样式以1024下显示优先
```css
 //响应动画
 transition: all .5s ease;
 //小屏优先
 padding: 0 23px;

 //大屏适配
 @include breakpoint($x-large) {
      padding: 0 30px;
 }
```
* 不公用的图片放置在各自组件文件夹下的images中
* vue组件首字母大写    
* 明显的色彩必须从颜色规范(永江提供的主题色)中派生出来,方便后期主题调整时全局适配
* 提交代码时控制台不要有错误和警告
* 接口api必须手动导入使用,方便后续接口调整时全局调整.接口调用时支持提示`import {nmdl_rcs_admin} from '@/api'`
* 减少隐性的全局组件,尽量明确引用的组件    
* serviceType命名空间下保存有后端接口对应的数据格式,尽量使用接口的格式约束数据类型 (默认情况下已经对接口返回的数据根据接口不同定义了不同的数据格式)   
 
## 环境配置
* 配置node-sass下载地址 `yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g`
* 可以使用这个库来提升下载速度 [tbify](https://github.com/fjc0k/tbify)

### 特殊版本要求
##### 以下内容除了node要自己安装之外,其他的已经通过yarn.lock锁定版本,不需要另外执行
* nodejs版本需要 v10.0.0 以上
* axios使用固定版本`yarn add axios@0.18.1`,新版本不再支持过滤器中传其他的参数,导致我们自定义的参数无法传参,如是否上传、加载显示等
* yarn 最好使用1.7.0以上,低版本有不可知的问题.升级yarn到指定版本 `npm install yarn@1.7.0 -g`

### 优化(IDEA)
* 启动`yarn serve`之后本地会生成`dist_electron`文件夹按`ctrl+alt+s`将此文件夹设置为不建索引
* 建议`axios-master`文件夹也按照上一条设置,IDEA会显示此文件夹内容有报错,看着不舒服