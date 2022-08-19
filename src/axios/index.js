import axios from 'axios'


// 超时时间
// axios.defaults.timeout = 5000;
//允许跨域携带cookie信息
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000/';

//为每次请求添加请求头
axios.interceptors.request.use(
    config => {
        const cookie = encodeURIComponent(sessionStorage.getItem("cookie"))
        if (cookie !== "null") {
            if (config.method == 'post') {

                config.data = {
                    ...config.data,
                    cookie: cookie,
                    timestamp: Date.now(),
                }
            } else if (config.method == 'get') {

                config.params = {
                    ...config.params,
                    timestamp: Date.now(),
                    cookie: cookie,
                }
            }
        } else {
            if (config.method == 'post') {

                config.data = {
                    ...config.data,
                    timestamp: Date.now(),
                }
            } else if (config.method == 'get') {

                config.params = {
                    ...config.params,
                    timestamp: Date.now(),
                }
            }
        }

        return config
    },
    error => {
        return Promise.reject(error);
    }
);

//设置token拦截器
// axios.interceptors.response.use(
//     (response) => {
//         if (response) {
//             switch (response.data.code) {
//                 case -1:
//                     MessageBox.alert(response.data.senddata[0].message, '提示', {
//                         confirmButtonText: '确定',
//                         callback: action => { // eslint-disable-line no-unused-vars
//                             store.dispatch('LogOut').then(() => {
//                                 //跳转到登录页面  
//                                 router.replace({
//                                     path: '/'
//                                 });
//                             });
//                         }
//                     });
//                     break;
//                 case 0:
//                     MessageBox.alert(response.data.senddata[0].message, '提示', {
//                         confirmButtonText: '确定',
//                         callback: action => { // eslint-disable-line no-unused-vars
//                             store.dispatch('LogOut').then(() => {
//                                 //跳转到登录页面  
//                                 router.replace({
//                                     path: '/'
//                                 });
//                             });
//                         }
//                     });
//                     break;

//             }

//         }
//         return response;
//     },
//     (error) => {}
// );

export default axios