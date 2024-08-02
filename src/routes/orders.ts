import { authMiddleware } from "../middlewares/authentication";
import { createNewOrder, getStoreOrders, getCustomerOrders, updateOrder, deleteOrder } from "../controllers/orders";
import { Router } from "express";



export default (router: Router) => {
    router.post('/order', createNewOrder)
    router.get('/order', authMiddleware, getStoreOrders)
    router.patch('/order/:id', authMiddleware, updateOrder)
    router.delete('/order/:id', authMiddleware, deleteOrder)


    router.get('/order/:id', authMiddleware, getCustomerOrders)
}