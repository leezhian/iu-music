import store from '../../store';
import {SET_USER_INFO} from '../../store/mutation-types';

/**
 * 获取min到max的随机数
 * @param min
 * @param max
 * @returns {number}
 */
export function randomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

/**
 * 重置store中的userInfo为初始值
 */
export function resetUserInfo() {
  const info = {
    id: 0,
    avatar: '',
    username: '',
    phone: '',
    buyId: null,
    likeId: null
  }

  store.commit(SET_USER_INFO, info);
}