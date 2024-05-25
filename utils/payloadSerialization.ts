import Base from '~/models/Base'

interface ModelConstruct {
  new (data: unknown): typeof Base
}

interface ModuleImportInterface {
  default: ModelConstruct
}

const modelModules = import.meta.glob<ModuleImportInterface>('~/models/*.ts', {
  eager: true
})

const getModelClasses = () => {
  const defaultExports = Object.values(modelModules).map(
    (module) => module.default
  )

  return defaultExports.filter(
    (ModelClass) => ModelClass?.prototype instanceof Base
  )
}

const modelClasses = getModelClasses()

export const serialize = (data: unknown) => {
  return data && data instanceof Base && data.toJSON()
}

export const deserialize = (data: { modelType: string }) => {
  const { modelType } = data
  if (!modelType) return

  const ModelClass = modelClasses.find(
    (ModelClass) => ModelClass.name === modelType
  )

  if (ModelClass) return new ModelClass(data)
}
