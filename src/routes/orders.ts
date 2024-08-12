import { authMiddleware } from "../middlewares/authentication";
import { createNewOrder, getStoreOrders, getCustomerOrders, updateOrder, deleteOrder, getStoreOrderbyId } from "../controllers/orders";
import { Router } from "express";



export default (router: Router) => {
    router.post('/orders', createNewOrder)
    router.get('/orders', authMiddleware, getStoreOrders)
    router.patch('/orders/:id', authMiddleware, updateOrder)
    router.delete('/orders/:id', authMiddleware, deleteOrder)
    router.get("/order/:id", authMiddleware, getStoreOrderbyId);



    router.get('/orders/:id', authMiddleware, getCustomerOrders)
}