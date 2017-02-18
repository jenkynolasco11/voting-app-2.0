import compose from 'koa-compose'

export default (routers) => {
  if(!Array.isArray(routers)){
    routers = Array.prototype.slice.call(arguments)
  }

  const middleware = []

  routers.forEach((route) => {
    middleware.push(route.routes())
    middleware.push(route.allowedMethods())
  })

  return compose(middleware)
}
