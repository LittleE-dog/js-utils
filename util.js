import { validatenull } from './validate'
import request from '@/router/axios'


// 表单序列化
export const serialize = data => {
  let list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}
export const getObjType = obj => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
/**
 * 对象深拷贝
 */
export const deepClone = data => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

/**
 * 判断一个对象里是否有空值
 */
export const isFullFilled = (data) => {
  

  let type = getObjType(data);
  if(type == 'object' || type == 'array'){
    let res = true
    if(data.length == 0 || Object.keys(data).length == 0){
      res = false;
    }
    for(let i in data){
      if(!isFullFilled(data[i])){
        res = false;
      }
    }
    return res
  }else{
    if(!data){
      return false;
    }else{
      return true;
    }
  }
}

/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + ' grayMode'
  } else {
    document.body.className = document.body.className.replace(' grayMode', '')
  }
}
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name
}

/**
 *加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key
  } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(
        data,
        key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }
  document.addEventListener("fullscreenchange", function () {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function () {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function () {
    listen();
  });
  document.addEventListener("msfullscreenchange", function () {
    listen();
  });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
  let result = true
  Object.keys(a).forEach(ele => {
    const type = typeof (a[ele])
    if (type === 'string' && a[ele] !== b[ele]) result = false
    else if (type === 'object' && JSON.stringify(a[ele]) !== JSON.stringify(b[ele])) result = false
  })
  return result
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = ''
  if (validatenull(dic)) return value
  if (typeof (value) === 'string' || typeof (value) === 'number' || typeof (value) === 'boolean') {
    let index = 0
    index = findArray(dic, value)
    if (index != -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach(ele => {
      index = findArray(dic, ele)
      if (index != -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i
    }
  }
  return -1
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}


export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { ///[xy]/g：匹配字符串中的x或者y或者多个xy，/g表示匹配多个，不加是一个
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
//日期格式化
export const dateFormat = (date, fmt) => {
  if (date == undefined || date == null) {
    return '-';
  }
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}


function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}


// 两个浮点数求和
export const accAdd = (num1, num2, scale) => {
  if (validatenull(scale)) {
    scale = 2;
  }
  if (validatenull(num1)) {
    num1 = 0
  }
  if (validatenull(num2)) {
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
  return ((r1 + r2) / Math.pow(10, pow)).toFixed(scale);
}

// 两个浮点数相减
export const accSub = (num1, num2, scale) => {
  if (validatenull(scale)) {
    scale = 2
  }
  if (validatenull(num1)) {
    num1 = 0
  }
  if (validatenull(num2)) {
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
  return ((r1 - r2) / Math.pow(10, pow).toFixed(pow)).toFixed(scale);
}
// 两数相除
export const accDiv = (num1, num2, scale) => {
  if (validatenull(scale)) {
    scale = 2
  }
  if (validatenull(num1)) {
    num1 = 0
  }
  if (validatenull(num2)) {
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
  return (r1 / r2).toFixed(scale);
}

export const accMul = (num1, num2, scale) => {
  if (validatenull(scale)) {
    scale = 2
  }
  if (validatenull(num1)) {
    num1 = 0
  }
  if (validatenull(num2)) {
    num2 = 0
  }
  var m = 0, s1 = num1.toString(), s2 = num2.toString();
  try { m += s1.split(".")[1].length } catch (e) { };
  try { m += s2.split(".")[1].length } catch (e) { };
  return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(scale);
}

export function formatMoney(value, firstSym = ',', secondSym = '.') {
  if (!Number(value)) return value
  if (!value) return `0${secondSym}00`
  let fixedValue = Number(value).toFixed(2)
  let [leftVal, rightVal] = fixedValue.split('.'), newVal = ''
  leftVal = leftVal.split('').reverse()
  for (let i = 0; i < leftVal.length; i++) {
      if (i == 0 || i % 3) {
          newVal = `${leftVal[i]}${newVal}`
      } else {
          newVal = `${leftVal[i]}${firstSym}${newVal}`
      }
  }
  newVal = `${newVal}${secondSym}${rightVal}`
  return newVal
}

/**
* 描述  局部过滤器 传入不同国家ID 返回该国家货币金额计数法
* @author TAOLI
* @date 2020-04-16
* @param {any} val 局部过滤
* @param {any} id 国家ID
* @returns {any}
*/
export function eachformatMoney(value,id){
  let countryId = id,
      firstSym = ',',
      secondSym = '.'
  if (countryId == '22') firstSym = '.'
  if (countryId == '23') {
      firstSym = '.'
      secondSym = ','
  }
  if (countryId == '26') {
      firstSym = ''
      secondSym = '.'
  }
  return formatMoney(value, firstSym, secondSym)
}