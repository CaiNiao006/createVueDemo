import axios from "axios";
import qs from "qs";
import Vue from "vue";
import {Toast} from "vant";

const baseUrl = process.env.BASE_URL + (process.env.NODE_ENV === "production" ? getUrl("weChat") : "/wechat");
const CancelToken = axios.CancelToken;
// const isCancel = axios.isCancel;
const source = CancelToken.source();
const service = axios.create();
// 添加请求拦截器
service.interceptors.request.use(
    config => {
        config.baseURL = baseUrl;
        config.timeout = 10000;
        config.cancelToken = source.token;
        return config;
    },
    error => Promise.reject(error)
);
Vue.prototype.$source = source;
Vue.prototype.$cancel = source.cancel;
// 添加响应拦截器
service.interceptors.response.use(
    response => {
        Toast.clear();
        const code = response?.data?.code;
        const msg = response?.data?.msg;
        if (!code === 200) {
            Toast.fail(msg || "网络错误,请稍后重试");
        }
        return response.data;
    },
    error => {
        Toast.clear();
        if (error.request.readyState === 4 && error.request.status === 0) {
            Toast.fail("网络不佳,请求超时,请稍候重试");
        } else if (error.response) {
            const {status} = error.response;
            const {msg} = error.response.data;
            Toast.fail(msg + status);
        }
        Promise.reject(error);
    }
);
let get,
    /**
     * 封装post请求
     * @param url
     * @param data
     */
    headersMap,
    post,
    /**
     * 封装file请求
     * @param url
     * @param data
     */
    file;
get = async (url, params = {}) => await service.get(url, {params});
headersMap = {
    form: "application/x-www-form-urlencoded",
    json: "application/json"
};
post = async (url, data = {}, formType = "form") => {
    if (formType === "form") {
        data = qs.stringify(data);
    }
    return await service.post(url, data, {
        headers: {
            "Content-Type": headersMap[formType]
        },
        cancelToken: source.token
    });
};
file = async (url, data = {}) => await service.post(url, data);


function getUrl(type) {
    const hash = {
        "test": 'https://xxxx.com/fp-transfer/api',
        "dev": 'https://xxxx.com/fp-transfer/api',
    }
    return hash[type]
}

export {get, post, file, baseUrl, source};
