import { getHandler, postHandler } from './handler'
import { Router } from 'express'

const router = Router()
router.route('/').get(getHandler).post(postHandler)

export default router
