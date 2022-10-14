/**
 * Created by ArvinChen9539 on 2019/4/4.
 */
const getComponentByRootPath = function (rootPath:string):any {
    //开发环境下不使用按需加载打包模式,提升打包速度
    if (process.env['NODE_ENV'] !== 'development') {
        return (page:any) => () =>
            import (`@/views${rootPath}/${page}.vue`);
    } else {
        return (page:any) => {
            return require(`@/views${rootPath}/${page}.vue`).default;
        }
    }
};

export {
    getComponentByRootPath
}
