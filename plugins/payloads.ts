export default definePayloadPlugin(() => {
  definePayloadReducer('modelType', serialize)
  definePayloadReviver('modelType', deserialize)
})
