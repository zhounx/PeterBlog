export function protoAugment(target, src, keys) {
    target.__proto__ = arrayMethods
}

export function copyAugment(target, src, keys) {
    keys.forEach(key => {
        def(target, key, src[key])
    })
}

export function def(obj, key, val) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: false,
        writable: true,
        configurable: true
    });
}
