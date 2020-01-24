import {_post} from 'static/js/http';

// 收藏单曲、歌单、专辑
export async function updateLike(type, likeid) {
  const res = await _post({url: '/v1/like/updateLike.do', data: {type, likeid}});
  return res;
}
