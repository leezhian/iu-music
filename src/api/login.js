import {_post, _get} from 'static/js/http';

export async function authToken() {
  const res = await _get({url: '/v1/token.do'});
  return res;
}

export async function login(data) {
  const res = await _post({url: '/v1/user/login.do', data});
  return res;
}