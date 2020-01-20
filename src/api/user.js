import {_get, _post} from 'static/js/http';

// 获取用户信息
export async function getUserInfo() {
  const res = await _get({url: '/v1/user/info.do'});
  return res;
}

export async function updateName(username) {
  const res = await _post({url: '/v1/user/updateName.do', data: {username: username}});
  return res
}