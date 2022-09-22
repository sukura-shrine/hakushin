import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerMicroApps, start } from 'qiankun'
import App from './app'
import { getAppsInfo, getMiddlewareFile } from './services'

const appName = process.env.ENV_APP_NAME

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

const root = ReactDOM.createRoot(document.getElementById('utils'));
root.render(<App />)
