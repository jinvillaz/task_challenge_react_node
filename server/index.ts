import { App } from './app'
import { TypeTask } from './models/task';

const main = async () => {
  const app = new App()
  await app.connectDatabase()
}
main()
