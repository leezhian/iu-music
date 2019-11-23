// 加密
import jsencrypt from 'jsencrypt';

let publicKey = '';
const devMode = process.env.NODE_ENV !== 'production';
if (env) {
    // development
    publicKey = '';
} else {
    // production
    publicKey = '';
}

export default {
    install(Vue) {
        let encrypt = new JSEncrypt();
        // 设置公钥
        encrypt.setPublicKey(`-----BEGIN PUBLIC KEY -----${key}-----END  PUBLIC KEY-----`);
        // 把加密对象挂载到vue的原型对象上
        Vue.prototype.$rsa = encrypt;
    }
};