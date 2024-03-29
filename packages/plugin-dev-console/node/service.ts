import path from 'path'
import http from 'http'
import process from 'process'
import Koa from 'koa'
import Router from '@koa/router'
import { clientPackagesInfo } from '@hakushin/utils'

const app = new Koa()

const router = new Router()
router.get('/api/appsInfo', async (ctx, next) => {
  await next()
  const appsInfo = await clientPackagesInfo('./')
  ctx.body = { data: appsInfo }
})

router.get('/api/middleware/:appName', async (ctx, next) => {
  await next()
  const { appName } = ctx.params
  const cwd = process.cwd().replace(/^.:/, a => `file:\\\\${a}`)
  const url = path.join(cwd, `packages/${appName}/.middleware.js`)
  try {
    const file = (await import(url)).default
    ctx.body = { data: { file: file.toString(), name: '.middleware.js', url } }
   } catch (error) {
    ctx.statusCode = 404
    ctx.body = { success: false, msg: `找不到文件 -> ${url}` }
  }
})

app.use(router.routes())

export default function service (shrineConfig) {
  const port = shrineConfig?.port ? Number(shrineConfig.port) - 1 : 3199
  // 经由webpack传递给web端
  process.env.SERVICE_PORT = String(port)

  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Allow-Origin', `http://localhost:${shrineConfig.port}`)
    await next()
  })

  console.log()
  console.log(`> dev-console service listting ${port}`)
  console.log('--------------------------------------')
  console.log()
  http.createServer(app.callback()).listen(port)
}
