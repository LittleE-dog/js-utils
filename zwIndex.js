// import vm from '../main'
import {
    getStore
} from '@/utils/store'
import Cookie from 'cookie'
import {
    Message
} from 'element-ui'
// import router from '@/router'

const jugeType = (obj) => {
    let getType = Object.prototype.toString
    return getType.call(obj)
}

export const isArr = (target) => {
    return jugeType(target) == '[object Array]'
}

export const isObj = (target) => {
    return jugeType(target) == '[object Object]'
}

export const isString = (target) => {
    return jugeType(target) == '[object String]'
}

export const isNumber = (target) => {
    return jugeType(target) == '[object Number]'
}

export const isBoolean = (target) => {
    return jugeType(target) == '[object Boolean]'
}

export const isUndefined = (target) => {
    return jugeType(target) == '[object Undefined]'
}

export const isNull = (target) => {
    return jugeType(target) == '[object Null]'
}

/**
 * 对象深拷贝
 */
export const deepClone = data => {
    let obj
    if (isArr(data)) {
        obj = []
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (isObj(data)) {
        obj = {}
        for (let key in data) {
            obj[key] = deepClone(data[key])
        }
    } else {
        // 不再具有下一层次
        return data
    }
    return obj
}


/**
 * 获取深层次的数组
 * keyName需要为a.b.c 对应data[a][b][c]
 */
export const getDeepArr = (data, keyName) => {
    if (isUndefined(keyName) || isNull(keyName)) {
        // 没有对象数组键名
        // 直接返回data数组
        if (isArr(data)) return data
        throwError("the data is not an Array, please provide the keyName to match correct Array");
    } else {
        const keyList = keyName.split(',')
        let value = data
        for (const iterator of keyList) {
            if (!value.hasOwnProperty(iterator) || isUndefined(value)) {
                throwError("please check the keyName's level")
            }
            value = value[iterator]
        }
        if (isArr(value)) return value
        throwError("the data is not an Array, please provide the keyName to match correct Array");
    }

}

export const throwError = (msg) => {
    throw new ReferenceError(msg);
}

export const isLogin = () => {
    const access_token = getStore({
        name: 'access_token'
    })
    if (access_token && access_token !== '') {
        return true
    } else {
        return false
    }
}

export const handleRes = (res) => {
    return new Promise((resolve, reject) => {
        if (res.data.code == 0) {
            resolve(res.data.data)
        } else {
            reject(res)
        }
    })
}

// 两个浮点数求和
export const accAdd = (num1, num2, scale) => {
    if (isUndefined(scale)) {
        scale = 2;
    }
    if (isUndefined(num1)) {
        num1 = 0
    }
    if (isUndefined(num2)) {
        num2 = 0
    }
    var pow, t1, t2, r1, r2;
    try {
        t1 = num1.toString().split('.')[1].length;
    } catch (e) {
        t1 = 0;
    }
    try {
        t2 = num2.toString().split(".")[1].length;
    } catch (e) {
        t2 = 0;
    }
    if (t1 > t2) {
        pow = t1;
        r1 = Number(num1.toString().replace(".", ""));
        r2 = Number(num2.toString().replace(".", "")) * Math.pow(10, pow - t2);
    } else {
        pow = t2;
        r2 = Number(num2.toString().replace(".", ""));
        r1 = Number(num1.toString().replace(".", "")) * Math.pow(10, pow - t1);
    }
    return Number(((r1 + r2) / Math.pow(10, pow)).toFixed(scale));
}

// 两个浮点数相减
export const accSub = (num1, num2, scale) => {
    if (isUndefined(scale)) {
        scale = 2
    }
    if (isUndefined(num1)) {
        num1 = 0
    }
    if (isUndefined(num2)) {
        num2 = 0
    }
    var pow, t1, t2, r1, r2;
    try {
        t1 = num1.toString().split('.')[1].length;
    } catch (e) {
        t1 = 0;
    }
    try {
        t2 = num2.toString().split(".")[1].length;
    } catch (e) {
        t2 = 0;
    }
    if (t1 > t2) {
        pow = t1;
        r1 = Number(num1.toString().replace(".", ""));
        r2 = Number(num2.toString().replace(".", "")) * Math.pow(10, pow - t2);
    } else {
        pow = t2;
        r2 = Number(num2.toString().replace(".", ""));
        r1 = Number(num1.toString().replace(".", "")) * Math.pow(10, pow - t1);
    }
    return Number(((r1 - r2) / Math.pow(10, pow).toFixed(pow)).toFixed(scale));
}
// 两数相除
export const accDiv = (num1, num2, scale) => {
    if (isUndefined(scale)) {
        scale = 2
    }
    if (isUndefined(num1)) {
        num1 = 0
    }
    if (isUndefined(num2)) {
        num2 = 0
    }
    var pow, t1, t2, r1, r2;
    try {
        t1 = num1.toString().split('.')[1].length;
    } catch (e) {
        t1 = 0;
    }
    try {
        t2 = num2.toString().split(".")[1].length;
    } catch (e) {
        t2 = 0;
    }
    if (t1 > t2) {
        pow = t1;
        r1 = Number(num1.toString().replace(".", ""));
        r2 = Number(num2.toString().replace(".", "")) * Math.pow(10, pow - t2);
    } else {
        pow = t2;
        r2 = Number(num2.toString().replace(".", ""));
        r1 = Number(num1.toString().replace(".", "")) * Math.pow(10, pow - t1);
    }
    return Number((r1 / r2).toFixed(scale));
}

export const accMul = (num1, num2, scale) => {
    if (isUndefined(scale)) {
        scale = 2
    }
    if (isUndefined(num1)) {
        num1 = 0
    }
    if (isUndefined(num2)) {
        num2 = 0
    }
    var m = 0,
        s1 = num1.toString(),
        s2 = num2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {

    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {

    }
    return Number((Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(scale));
}

//向上取整
export const accUpperInt = (num) => {
    let s = num.toString()
    if (s.indexOf('.') < 0) return num
    let l = Number(s.split('.')[0]),
        r = Number(s.split('.')[1])
    if (r == 0) return (l)
    return (l + 1)
}

//排序 升序
export const compare = (key) => {
    return (a, b) => {
        let val1 = Number(a[key])
        let val2 = Number(b[key])
        if (val1 < val2) {
            return -1
        } else if (val1 > val2) {
            return 1
        } else {
            return 0
        }
    }
}

export const once = (fn) => {
    let called = false
    return () => {
        if (!called) {
            called = true
            fn.apply(this, arguments)
        }
    }
}


//切割fullName
export const splitFullName = (fullName) => {
    if (fullName == '' || fullName == undefined) {
        return
    }
    let a = []
    a = fullName.split(' ')
    if(a.length == 1) {
        a = [a[0],' ']
    }
    if (a.length == 2) {
        return a
    }
    if (a.length >= 3) {
        // a.splice(1, 1)
        a = [a[0],a[a.length-1]]
        return a
    }
}


//CPF 格式化
export function formatCPF(value) {
    value = value.replace(/[.]/g, "");
    value = value.replace("-", "");
    value = value.replace(/[^0-9]*/g, "");
    if (value && value.length > 3) {
        value = value.replace(/(.{3})/, '$1.')
    }
    if (value && value.length > 6) {
        value = value.replace(/(.{7})/, '$1.')
    }
    if (value && value.length > 9) {
        value = value.replace(/(.{11})/, '$1-')
    }

    if (value.length > 0) {
        let lastChar = value.charAt(value.length - 1);
        if (lastChar == '.' || lastChar == '-') {
            value = value.slice(0, value.length - 1);
        }
    }
    return value
}

export const addJsFile = (w, d, s, src) => {
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s);
        j.async = true;
        j.src = src;
        f.parentNode.insertBefore(j, f);
}

export const  getParamFromCookie = (key) => {
    const cookies = Cookie.parse(document.cookie)
    return cookies[key] || ''
}


