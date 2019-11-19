/**
 * 获取min到max的随机数
 * @param min
 * @param max
 * @returns {number}
 */
export function randomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}
