/**
 * axios 封装
 * 接收一个option对象参数
 * 常用包含url、data、isReturnResponse，还可接收任何axios中的参数
 * 其中isReturnResponse表示接口返回的数据原封不动返回，如果为false或没有，则只返回数据的data
 */
import axios from 'axios';

const devMode = process.env.NODE_ENV !== 'production';
const baseURL = devMode ? 'http://192.168.3.7:3001' : '';

const service = axios.create({
    baseURL: baseURL,
    timeout: 1000,
});

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

function request(type, option) {
    return new Promise((resolve, reject) => {
        let axiosPromise;
        if (type === 'post') {
            let requestData = option.data;
            axiosPromise = service.post(option.url, requestData, option.config);
        } else if (type === 'get') {
            option.config = option.config || {};
            option.config.params = option.data || option.config.params;
            axiosPromise = service.get(option.url, option.config);
        }
        // 接口返回数据执行
        axiosPromise.then(response => {
            let data = response.data;
            if (option.isReturnResponse) {
                resolve(response);
            } else {
                resolve(data);
            }
        }).catch(error => {
            // 错误处理
            reject(error);
        });
    });
}

const post = function (option) {
    return request('post', option);
};

const get = function (option) {
    return request('get', option);
};

export {post, get};