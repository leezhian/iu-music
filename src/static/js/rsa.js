// 加密
import JSEncrypt from 'jsencrypt';

let publicKey = '';
const devMode = process.env.NODE_ENV !== 'production';
if (devMode) {
    // development
    publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDe6kAmUznjfZ4fZ3GVNsg8yJDZLex5hqWX0uPefUuc7qAbRfryiaAkOrpUtDpMWfJpKKc6mODdoeri27C3j99KAjkmCLQCJ0B5PhR66KB+wP05PGxqiytuoJZBVrss+eh1eHV+MP8ZmMnxCV2PB5q/6unTMHh0NeEbEE3ulchILQIDAQAB';
} else {
    // production
    publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDe6kAmUznjfZ4fZ3GVNsg8yJDZLex5hqWX0uPefUuc7qAbRfryiaAkOrpUtDpMWfJpKKc6mODdoeri27C3j99KAjkmCLQCJ0B5PhR66KB+wP05PGxqiytuoJZBVrss+eh1eHV+MP8ZmMnxCV2PB5q/6unTMHh0NeEbEE3ulchILQIDAQAB';
}

export default {
    install(Vue) {
        let encrypt = new JSEncrypt();
        // 设置公钥
        encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`);
        // 把加密对象挂载到vue的原型对象上
        Vue.prototype.$rsa = encrypt;
    }
};