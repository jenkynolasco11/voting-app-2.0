import { config as dotenv_config } from 'dotenv'

import mongoose from 'mongoose'
import Koa from 'koa'
import logger from 'koa-logger'
import bodyparser from 'koa-bodyparser'
import Pug from 'koa-pug'
import session from 'koa-session2'
import MongooseSession from 'koa-session-mongoose'

import routes from './routes'

dotenv_config()

// Database configuration
mongoose.Promise = global.Promise
if(process.env.NODE_ENV == 'development') mongoose.set('debug', true)

const db = mongoose.connect(process.env.DB_PATH).then((err) => {
  if(err) console.error('Something happened while connecting to the database.')
  console.log('Connected to the database...')
})

const app = new Koa()

// views renderer
const pug = new Pug({
    viewPath: "./views",
    debug: false,
    pretty: false,
    compileDebug: false,
    // locals: global_locals_for_all_pages,
    // basedir: 'path/for/pug/extends',
    // helperPath: [
    //   'path/to/pug/helpers',
    //   { random: 'path/to/lib/random.js' },
    //   { _: require('lodash') }
    // ],
    app,
})

// app configuration
app
  .use(logger())
  .use(bodyparser())
  .use(session({
    key : process.env.SESSION_SECRET,
    store : new MongooseSession()
  }))
  // .use(pug('./views'))
  .use(routes)

// Running the server... 
const PORT = process.env.PORT || 8080
app.listen(PORT, () => { console.log(`running on port ${PORT}...`)})
