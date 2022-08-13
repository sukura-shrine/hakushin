// import path from 'path'
import { registerMicroApps, start } from 'qiankun'

const {
  VITE_APP_NAME: appName,
  VITE_SERVICE_PORT: servicePort,
} = import.meta.env

const fetchAPi = async (input, init?) => {
  const url = `//localhost:${servicePort}${input}`
  const res = await fetch(url, init)
  return res.json()
}

async function main () {
  const { data } = await fetchAPi(`/api/appsInfo`)
  const list = data.map(item => {
    const { name, hakushin } = item
    return {
      name,
      activeRule: name,
      container: '#dev-console',
      entry: `//localhost:${hakushin.port}` }
  })
  registerMicroApps(list)

  const { data: { file } } = await fetchAPi(`/api/middleware/${appName}`)
  const middleware = eval(file)
  if (typeof middleware === 'function') {
    middleware()
  }
  start()
}

main()
