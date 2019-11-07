/**
 * 为dom对象添加一个class类
 * @param el dom对象
 * @param className class类名
 */
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }

    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

/**
 * 检查dom对象上是否具有特定的class
 * @param el dom对象
 * @param className 类名
 * @returns {boolean} 返回当前dom对象是否具有这个class
 */
export function hasClass(el, className) {
    const reg = new RegExp('(^|\\s)' + className + '(^|\\s)');
    return reg.test(el.className);
}

/**
 * 获取或设置dom元素上的特定自定义属性值
 * @param el dom元素
 * @param name 自定义属性（不含data-）
 * @param val 设置的值
 * @returns {*|ASTNode|string|void}
 */
export function getData(el, name, val) {
    const prefix = 'data-';
    name = prefix + name;
    if (val) {
        return el.setAttribute(name, val)
    } else {
        return el.getAttribute(name)
    }
}
