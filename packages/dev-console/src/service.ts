
import http from 'http'
import Koa from 'koa'
import Router from '@koa/router'
import { clientPackagesInfo } from '@hakushin/utils'
import viteConfig from '../vite.config.js'

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Origin', `http://localhost:${viteConfig.server.port}`)
  await next()
})

const router = new Router()
router.get('/api/appsInfo', async (ctx, next) => {
  await next()
  const appsInfo = await clientPackagesInfo('./')
  ctx.body = { data: appsInfo }
})

app.use(router.routes())

console.log('listting 3201')
http.createServer(app.callback()).listen(3201)
