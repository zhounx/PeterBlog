export default class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }

    get() {
        // 先把实例化对象赋值给target
        window.target = this
        // 读取expOrFn中想要读的数据
        let value = this.getter.call(this.vm, this.vm)
        // 再将target清空
        window.target = undefined
        return value
    }

    update() {
        const oldValue = this.value
        this.value = this.get()
        // 执行回调函数，函数体就是用户在watch里自定义的逻辑
        this.cb.call(this.vm, this.value, oldValue)
    }
}

function parsePath(path) {
    // key值若数字开头或.结尾则不合法
    if (/[^\w.$]/.test(path)) {
        return
    }
    // 分割成数组，一层一层拿数据
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) {
                return
            }
            // 最后拿到的obj就是keypath想要读取的数据
            obj = obj[segments[i]]
        }
    }
}
