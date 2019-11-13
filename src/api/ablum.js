import axios from "axios";

export async function getAblumList(page = 1, pageSize = 6) {
    const res = await axios.get('/api/ablum/getAblumList.do', {params: {page, pageSize}});
    return res;
}

export async function getSongList(songIds) {
    const res = await axios.post('/api/ablum/getSongList.do', {songIds});
    return res;
}