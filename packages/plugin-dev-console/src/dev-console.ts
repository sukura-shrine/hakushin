// import path from 'path'
import { registerMicroApps, start } from 'qiankun'
import { getAppsInfo, getMiddlewareFile } from './services'

const {
  VITE_APP_NAME: appName,
} = import.meta.env

async function main () {
  const data = await getAppsInfo()
  const list = data.map(item => {
    const { name, hakushin } = item
    return {
      name,
      activeRule: name,
      container: '#dev-console',
      entry: `//localhost:${hakushin.port}` }
  })
  registerMicroApps(list)

  try {
    const data = await getMiddlewareFile(appName as string)
    const middleware = eval(data.file as string)
    if (typeof middleware === 'function') {
      middleware()
    }
  } catch (error) {
  }
  start()
}

main()
