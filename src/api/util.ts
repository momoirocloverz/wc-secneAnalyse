import axios from 'axios';
import {setInterceptors} from '@/util/apiUtil'

const instance = axios.create();
//设置拦截器
setInterceptors(instance);

function createAPI(baseURL:string) {
  return function (conf:any) {
    conf = conf || {};
    let i = instance(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method
    }, conf.opts));
    return (i as Promise<unknown> as Promise<{data:any,status:number,message:string,total?:number}>)
  };
}

function convertRESTAPI(url:string, opts:any) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export {
  createAPI,
  convertRESTAPI,
  instance
};
