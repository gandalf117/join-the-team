class MultipleItems {
  static asItems (json, className) {
    if (!Array.isArray(json)) {
      throw new Error('Error: asItems expects an array!')
    }
    return json.map(item => {
      return new className(item || {})
    })
  }
}

export {
  MultipleItems
}
