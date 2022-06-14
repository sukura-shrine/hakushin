import { registerMicroApps, start } from 'qiankun'

async function main () {
  const res = await fetch('//localhost:3299/api/appsInfo')
  const { data } = await res.json()
  const list = data.map(item => {
    const { name, hakushin } = item
    return {
      name,
      activeRule: name,
      container: '#dev-console',
      entry: `//localhost:${hakushin.port}` }
  })
  registerMicroApps(list)
  start()
}

main()
