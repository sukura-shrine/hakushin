
import http from 'http'
import Koa from 'koa'
import Router from '@koa/router'
import { clientPackagesInfo } from '@hakushin/utils'

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3999')
  await next()
})

const router = new Router()
router.get('/api/appsInfo', async (ctx, next) => {
  await next()
  const appsInfo = await clientPackagesInfo('./')
  ctx.body = { data: appsInfo }
})

app.use(router.routes())

console.log('listting 3900')
http.createServer(app.callback()).listen(3900)
