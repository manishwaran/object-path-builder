export default class Base {

  constructor(bindings) {
    this.bindings = bindings || {}
    this.result = []
    this.isBindingOn = true
  }

  getResult() {
    return this.result
  }

  initResult() {
    this.result = []
  }

  pushToResult(key) {
    this.result.push(key)
  }

  getKey(string, deliminator) {
    const charArray = []
    for(let i in string) {
      if(!deliminator.includes(string[i])) charArray.push(string[i])
      else return charArray.join('')
    }
    return charArray.join('')
  }

  pushObjectKey(string, deliminator = ['.', '[']) {
    const key = this.getKey(string, deliminator)
    this.pushToResult(key)
    return key
  }

  setBindingExtractOn() {
    this.isBindingOn = true
  }

  setBindingExtractOff() {
    this.isBindingOn = false
  }

}
