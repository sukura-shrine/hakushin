
import http from 'http'
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

app.use(router.routes())

export default function service (shrineConfig) {
  const port = shrineConfig?.port ? Number(shrineConfig.port) + 99 : 3299
  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Allow-Origin', `http://localhost:${port}`)
    await next()
  })

  console.log(`listting ${port}`)
  http.createServer(app.callback()).listen(port)
}
