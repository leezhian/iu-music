import axios from "axios";

export async function getAlbumList(page = 1, pageSize = 6) {
    const res = await axios.get('/api/album/getAlbumList.do', {params: {page, pageSize}});
    return res;
}

export async function getSongList(songIds) {
    const res = await axios.post('/api/album/getSongList.do', {songIds: songIds});
    return res;
}