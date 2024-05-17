import { classToJSON } from '~/utils/general'

class Base {
  modelType: string

  constructor() {
    this.modelType = this.constructor.name
  }

  toJSON() {
    return classToJSON(this)
  }
}

export default Base
