import { createAPI } from '../util';
import config from '../config';
let mockConfig:{
  //允许任意属性存在
  [propName: string]: string
} = {
  mock: '/mock/http://10.0.2.198:8460/wcscene-admin/v3/api-docs?group=api/',
  dev: '',
  pre: '',
  prod: ''
}
const baseUrl:string = mockConfig[config.env || 'mock'];

export default createAPI(baseUrl);
