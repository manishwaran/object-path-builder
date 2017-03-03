import Binding from './binding';

export default class ObjectPathBuilder extends Binding {

  onDot(string, offset = 1, deliminator = ['.', '[']) {
    const key = this.pushObjectKey(string.slice(offset), deliminator)
    return string.slice(offset + key.length)
  }

  onSquareBracket(string) {
    const offset = 1
    const offsetChar = string.charAt(offset)
    if (offsetChar === '\'' || offsetChar === '\"') {
      const slicedString = this.onDot(string, 2, [offsetChar])
      return slicedString.slice(2 * offset)
    }
    return this.onBinding(string)
  }

  onBinding(string) {
    const bindingString = this.extractBindingString(string)
    if (!bindingString.length) throw new Error('Empty binding not allowed.')
    const result = this.getResult()
    this.initResult()
    if (this.isBindingOn) {
      this.setBindingExtractOff()
      this.convertPath(bindingString)
      const bindingKey = this.getValueRecursively(this.getResult())
      this.result = result.concat(bindingKey)
      this.setBindingExtractOn()
    } else {
      this.convertPath(bindingString)
      const bindingKeys = this.getResult()
      this.result = result.concat(bindingKeys)
    }
    return string.slice(bindingString.length + 2)
  }

  splitPath(path) {
    const firstCharacter = path.charAt(0)
    switch (firstCharacter) {
      case '.': return this.onDot(path)
      case '[': return this.onSquareBracket(path)
      default:
        const key = this.pushObjectKey(path)
        return path.slice(key.length)
    }
  }

  convertPath(path) {
    if (path) {
      this.convertPath(this.splitPath(path))
    }
  }
}
