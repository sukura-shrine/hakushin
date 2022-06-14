
import http from 'http'
import Koa from 'koa'
import Router from '@koa/router'
import { clientPackagesInfo } from '@hakushin/utils'

const app = new Koa()

let config = {}

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Origin', `http://localhost:${config.port}`)
  await next()
})

const router = new Router()
router.get('/api/appsInfo', async (ctx, next) => {
  await next()
  const appsInfo = await clientPackagesInfo('./')
  ctx.body = { data: appsInfo }
})

app.use(router.routes())

export default function service (shrineConfig) {
  config = shrineConfig
  console.log('listting 3299')
  http.createServer(app.callback()).listen(3299)
}
