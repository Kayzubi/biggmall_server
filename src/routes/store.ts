import { authMiddleware } from '../middlewares/authentication'
import { createNewStore, getStoreBySlug, getUserStore, getUserStores, updateStore, deleteStore } from '../controllers/store'
import { Router } from 'express'


export default (router: Router) => {
    router.post('/store/create', authMiddleware, createNewStore)
    router.get('/store', authMiddleware, getUserStore)
    router.get("/stores", authMiddleware, getUserStores);
    router.patch("/store", authMiddleware, updateStore);
    router.delete("/store", authMiddleware, deleteStore);

    router.get('/store/:slug', getStoreBySlug)
}