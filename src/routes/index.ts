import express, { Router } from 'express'
import authentication from './authentication'
import stores from './store'
import products from './products'

const router = express.Router()


export default (): Router => {
    authentication(router)
    stores(router)
    products(router)

    return router
}