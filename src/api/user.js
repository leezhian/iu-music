import {_get} from 'static/js/http';

// 获取用户信息
export async function getUserInfo(uid) {
  const res = await _get({url: '/v1/user/info.do', data: {id: uid}});
  return res;
}