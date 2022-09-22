import useSWR from 'swr'

const {
  VITE_SERVICE_PORT: servicePort,
} = import.meta.env

const fetchAPi = async (input, init?) => {
  const url = `//localhost:${servicePort}${input}`
  const res = await fetch(url, init)
  const { data } = await res.json()
  return data
}

export async function getAppsInfo () {
  return await fetchAPi(`/api/appsInfo`)
}

export async function getMiddlewareFile (appName: string) {
  return await fetchAPi(`/api/middleware/${appName}`)
}

interface AppInfo {
  name: string
  version: string
  author: number
  description: string
  email: string
  hakushin: {
    port: number
  }
}
export function useAppsInfo () {
  return useSWR<AppInfo[]>('/api/appsInfo', fetchAPi)
}
