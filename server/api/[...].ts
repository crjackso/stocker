import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().stockerApiUrl
  const path = event.path.replace(/^\/api\//, '')
  const target = joinURL(proxyUrl, path)

  return await proxyRequest(event, target)
})
