import useSWR from 'swr'

const servicePort = process.env.ENV_SERVICE_PORT

const fetchAPi = async (input, init) => {
  const url = `//localhost:${servicePort}${input}`
  const res = await fetch(url, init)
  const { data } = await res.json()
  return data
}

export async function getAppsInfo () {
  return await fetchAPi(`/api/appsInfo`)
}

export async function getMiddlewareFile (appName) {
  return await fetchAPi(`/api/middleware/${appName}`)
}

export function useAppsInfo () {
  return useSWR('/api/appsInfo', fetchAPi)
}
