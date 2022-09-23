import { startApp } from "wujie"
import { getAppsInfo, getMiddlewareFile } from './services'

const {
  VITE_APP_NAME: appName,
} = import.meta.env

async function main () {
  const data = await getAppsInfo()
  try {
    const data = await getMiddlewareFile(appName as string)
    const middleware = eval(data.file as string)
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
        el: document.getElementById('dev-console') as HTMLElement,
        url: `http://localhost:${hakushin.port}/${name}`
      })
    }
  }
}

main()
