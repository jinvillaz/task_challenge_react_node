import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import log4js from 'log4js'

const logger = log4js.getLogger('DbConnection')
class DbManager {
  urlConnection: string
  constructor() {
    this.urlConnection = 'mongodb://localhost:27017/test'
  }

  loadModels() {
    const pathSchemas = `${__dirname}/schemas`
    const schemas = fs.readdirSync(pathSchemas)
    schemas.forEach((schema) => {
      const name = path.parse(schema).name
      require(`${pathSchemas}/${name}`)
    })
    logger.info('Models loaded. ', schemas.length)
  }

  async connect() {
    this.urlConnection = process.env.DATABASE_URL
    await mongoose.connect(this.urlConnection)
    logger.info(`Successful database connection on ${this.urlConnection}`)
    this.loadModels()
  }

  async disconnect() {
    await mongoose.disconnect()
    logger.info('Successful database disconnection.')
  }
}

export const dbManager = new DbManager()
