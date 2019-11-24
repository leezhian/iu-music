import {post, get} from 'static/js/http';

export async function getCover(type = 1) {
    const res = await get({url: '/api/cover/getCover.do', data: {type}});
    return res;
}

export async function getRecordList(type = 1, page = 1, pageSize = 6) {
    const res = await get({url: '/api/album/getRecordList.do', data: {type, page, pageSize}});
    return res;
}

export async function getSongList(songIds) {
    const res = await post({url: '/api/album/getSongList.do', data: {songIds: songIds}});
    return res;
}

export async function getLyric(songId) {
    const res = await get({url: '/api/album/getLyric.do', data: {id: songId}});
    return res;
}