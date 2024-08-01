import express, { Router } from 'express'
import authentication from './authentication'
import stores from './store'

const router = express.Router()


export default (): Router => {
    authentication(router)
    stores(router)

    return router
}