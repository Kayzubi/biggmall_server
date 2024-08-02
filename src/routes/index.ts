import express, { Router } from 'express'
import authentication from './authentication'
import stores from './store'
import products from './products'
import orders from './orders'

const router = express.Router()


export default (): Router => {
    authentication(router)
    stores(router)
    products(router)
    orders(router)

    return router
}