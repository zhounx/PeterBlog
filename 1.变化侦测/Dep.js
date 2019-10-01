export default class Dep {
    constructor() {
        this.subs = []
    }

    // 增加依赖
    addSub(sub) {
        this.subs.push(sub)
    }

    // 移除依赖
    removeSub(sub) {
        remove(sub)
    }

    //收集依赖
    depend() {
        if (window.target) {
            this.addSub((window.target))
        }
    }

    notify() {
        // 对数组的拷贝
        const subs = this.subs.slice()
        // 告诉依赖要同步更新
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

/**
 * 移除数组元素
 * @param arr
 * @param item
 * @returns {T[]}
 */
function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}
