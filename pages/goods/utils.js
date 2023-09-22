const sfEval = (model, str, property = null) => {
  let cs = str.replace(/\s*/g, '').replace(/\[%=/g, '').replace(/%\]/g, '').split(/(&&|\|\||>|<|===|!==|>=|<=|\(|\))/)
  for (const cIdx in cs) {
    if (property && model[cs[cIdx]] !== undefined) {
      // 处理0.aaa的问题
      // 处理以0开头的字符串
      // parseFloat
      // parseFloat('') NaN
      // parseFloat(null) NaN
      // parseFloat(true) NaN
      // parseFloat(false) NaN
      // Number('0.aaa') NAN
      // 不是''不是null不是true不是false
      // 是false // 后面即使是true也不走
      // 是 0.aaa true // 后面是false
      // 对象和数组都是parseFloat之后都是NaN
      if (model[cs[cIdx]]) {
        if (!isNaN(parseFloat(model[cs[cIdx]][property])) && !isNaN(Number(model[cs[cIdx]][property]))) {
          // 之后一个判断处理字符串'0000'的情况
          // 如何处理
          if ((model[cs[cIdx]][property] + '').charAt() === '0' && (model[cs[cIdx]][property] + '').length > 1) {
            cs[cIdx] = "'" + model[cs[cIdx]][property] + "'"
          } else {
            cs[cIdx] = parseFloat(model[cs[cIdx]][property])
          }
        } else {
          // 处理下拉框的清除问题 null以及其他null的问题
          if (model[cs[cIdx]][property] === null) {
            model[cs[cIdx]][property] = ''
          }
          cs[cIdx] = "'" + model[cs[cIdx]][property] + "'"
        }
      }
    } else if (model[cs[cIdx]] !== undefined) {
      // 处理0.aaa的问题
      // 处理以0开头的字符串
      // parseFloat
      // parseFloat('') NaN
      // parseFloat(null) NaN
      // parseFloat(true) NaN
      // parseFloat(false) NaN
      // Number('0.aaa') NAN
      // 不是''不是null不是true不是false
      // 是false // 后面即使是true也不走
      // 是 0.aaa true // 后面是false
      // 对象和数组都是parseFloat之后都是NaN
      if (!isNaN(parseFloat(model[cs[cIdx]])) && !isNaN(Number(model[cs[cIdx]]))) {
        // 之后一个判断处理字符串'0000'的情况
        // 如何处理
        if ((model[cs[cIdx]] + '').charAt() === '0' && (model[cs[cIdx]] + '').length > 1) {
          cs[cIdx] = "'" + model[cs[cIdx]] + "'"
        } else {
          cs[cIdx] = parseFloat(model[cs[cIdx]])
        }
      } else {
        // 处理下拉框的清除问题 null以及其他null的问题
        if (model[cs[cIdx]] === null) {
          model[cs[cIdx]] = ''
        }
        cs[cIdx] = "'" + model[cs[cIdx]] + "'"
      }
    } else if ((cs[cIdx].indexOf("'") < 0 || (!isNaN(parseFloat(cs[cIdx].replace(/'/g, ''))) && !isNaN(Number(cs[cIdx].replace(/'/g, ''))))) && !cs[cIdx].match(/^(&&|\|\||>|<|===|!==|>=|<=|\(|\))$/)) {
      // convert to string fix bug for model is null with FIELD = '0', FIELD is undefined
      if (!isNaN(parseFloat(cs[cIdx].replace(/'/g, ''))) && !isNaN(Number(cs[cIdx].replace(/'/g, '')))) {
        if ((cs[cIdx] + '').charAt() === '0' && (cs[cIdx] + '').length > 1) {
          cs[cIdx] = "'" + cs[cIdx] + "'"
        } else {
          cs[cIdx] = parseFloat(cs[cIdx].replace(/'/g, ''))
        }
      } else {
        cs[cIdx] = "'" + cs[cIdx] + "'"
      }
    }
  }

  let csTemp = JSON.parse(JSON.stringify(cs))

  return true && fn(csTemp)
}

const fn = (csTemp) => {
  let resultBool = false
  let arr1 = []
  let arr2 = []
  if (csTemp.length < 4) {
    resultBool = calcFuc(csTemp)
    return resultBool
  } else {
    for (let i in csTemp) {
      if (csTemp[i] == '&&' || csTemp[i] == '||') {
        arr1 = csTemp.slice(0, i)
        arr2 = csTemp.slice(Number(i) + 1, Number(i) + 4)
        if (csTemp[i] == '&&') {
          resultBool = calcFuc(arr1) && calcFuc(arr2)
        } else {
          resultBool = calcFuc(arr1) || calcFuc(arr2)
        }
        csTemp.splice(0, Number(i) + 4, resultBool)
        return fn(csTemp)
        break
      }
    }
  }
}

const calcFuc = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '&&':
        return arr[i - 1] && arr[i + 1]
      case '||':
        return arr[i - 1] || arr[i + 1]
      case '>':
        return arr[i - 1] > arr[i + 1]
      case '<':
        return arr[i - 1] < arr[i + 1]
      case '===':
        return arr[i - 1] === arr[i + 1]
      case '!==':
        return arr[i - 1] !== arr[i + 1]
      case '>=':
        return arr[i - 1] >= arr[i + 1]
      case '<=':
        return arr[i - 1] <= arr[i + 1]
      case true:
        return true
      default:
        break
    }
  }
  return false
}

module.exports = {
  sfEval
}