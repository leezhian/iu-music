import {_get, _post} from 'static/js/http';

// 获取用户信息
export async function getUserInfo() {
  const res = await _get({url: '/v1/user/info.do'});
  return res;
}

// 修改用户昵称
export async function updateName(username) {
  const res = await _post({url: '/v1/user/updateName.do', data: {username: username}});
  return res
}

// 获取用户创建的歌单
export async function getMyPlaylist() {
  const res = await _get({url: '/v1/user/myPlaylist.do'});
  return res
}

