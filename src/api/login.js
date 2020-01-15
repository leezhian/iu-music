import {_post} from 'static/js/http';

export async function login(data) {
  const res = await _post({url: '/v1/user/login.do', data});
  return res;
}