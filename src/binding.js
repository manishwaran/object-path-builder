import Base from './base'

export default class Binding extends Base {

  syntaxTopElement() {
    if (this.top >= 0) return this.checkSyntax[this.top]
    return -1
  }

  pushToSyntax(char) {
    this.top += 1
    this.checkSyntax[this.top] = char
  }

  popFromSyntax() {
    this.top -= 1
  }

  initSyntaxCheck() {
    this.top = 0
    this.checkSyntax = ['[']
  }

  checkValidated() {
    return this.top < 0 ? true : false
  }

  makeDecision(char) {
    const mapper = {
      ']': '[',
      '\'': '\'',
      '\"': '\"'
    }
    switch (char) {
      case '[':
        this.pushToSyntax(char)
        return false;
      case ']':
      case '\'':
      case '\"':
        if(this.syntaxTopElement() === mapper[char]) {
          this.popFromSyntax()
        }
        return this.checkValidated()
    }
  }

  validateBinding(string) {
    this.initSyntaxCheck()
    let index = 1
    for(; index < string.length; index++) {
      if(this.makeDecision(string[index])) {
        return index
      }
    }
    return -1;
  }

  getValueRecursively(array, node = this.bindings, index = 0) {
    if (array[index + 1] === undefined) {
      if (node[array[index]]) return node[array[index]];
      throw new Error(`Not valid key - ${array[index]} for accessing binding.`);
    }
    return this.getValueRecursively(array, node[array[index]], index + 1);
  }

  extractBindingString(string) {
    const bindingLength = this.validateBinding(string)
    if (bindingLength !== -1) {
      const bindingString = string.slice(1, bindingLength)
      return bindingString.trim();
    }
    throw new Error('Not valid property. Check syntax')
  }

}
