import Router from 'koa-router'
import combineRouters from './routes-combiner'

const indexRoute = Router()

indexRoute.get('/', async (ctx, next) => {
  console.log(ctx)
  ctx.render('index')
})

const router = combineRouters([
  indexRoute
])

export default router
