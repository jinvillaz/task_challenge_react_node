import * as dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import log4js from 'log4js'
import morgan from 'morgan'
import path from 'path'
import router from './routes'
import db from './database'

const logger = log4js.getLogger('App')
logger.level = 'debug'

const PORT = process.env.PORT || 4000

export class App {
  server: import('http').Server<typeof import('http').IncomingMessage, typeof import('http').ServerResponse>

  constructor() {
    const app = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(morgan('tiny'))
    app.use(cors())
    app.use('/api', router)
    if (process.env.NODE_ENV !== 'development') {
      app.use(express.static(path.resolve(__dirname, '../client/build')))
      app.get('/*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
      })
    }

    this.server = app.listen(PORT, () => {
      logger.info(`The application is listening on port ${PORT}...`)
    })
  }

  async connectDatabase() {
    try {
      await db.connect()
      logger.info('database connected.')
    } catch (ex) {
      logger.warn('database error on try to connected ', ex)
    }
  }

  async disconnectDatabase() {
    try {
      await db.disconnect()
      logger.info('database connected.')
    } catch (ex) {
      logger.warn('database error on try to connected ', ex)
    }
  }

  getApp() {
    return this.server
  }
}
