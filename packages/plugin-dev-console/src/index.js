import { startApp } from "wujie"
import { getAppsInfo, getMiddlewareFile } from './services.js'

const appName = process.env.ENV_APP_NAME

async function main () {
  const data = await getAppsInfo()
  try {
    const data = await getMiddlewareFile(appName)
    const middleware = eval(data.file)
    if (typeof middleware === 'function') {
      await middleware()
    }
  } catch (error) {
  }
  const list = location.pathname.match(/[^/?#]+/)
  if (list) {
    const name = list[0]
    const hakushin = data.find(item => {
      return item.name === name
    })?.hakushin
    if (hakushin) {
      startApp({
        name,
        el: document.getElementById('dev-console'),
        url: `http://localhost:${hakushin.port}/${name}`
      })
    }
  }
}

main()
