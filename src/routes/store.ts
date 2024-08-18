import { authMiddleware } from '../middlewares/authentication'
import {
  createNewStore,
  getStoreBySlug,
  getUserStore,
  getUserStores,
  updateStore,
  deleteStore,
  addShippingMethod,
  deleteShippingMethod,
  addDisCountCode,
  deleteDiscountCode,
  addStoreBanner,
  deleteStoreBanner,
  addProductsCategory,
  deleteProductsCategory,
  editProductsCategory,
} from '../controllers/store'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/store', authMiddleware, createNewStore)
  router.get('/store', authMiddleware, getUserStore)
  router.get('/stores', authMiddleware, getUserStores)
  router.patch('/store', authMiddleware, updateStore)
  router.delete('/store', authMiddleware, deleteStore)
  router.patch('/store/shipping-methods/add', authMiddleware, addShippingMethod)
  router.patch(
    '/store/shipping-methods/delete/:id',
    authMiddleware,
    deleteShippingMethod
  )
  router.patch('/store/coupon/add', authMiddleware, addDisCountCode)
  router.patch('/store/coupon/delete/:id', authMiddleware, deleteDiscountCode)
  router.patch('/store/banners/add', authMiddleware, addStoreBanner)
  router.patch('/store/banners/delete/:id', authMiddleware, deleteStoreBanner)
  router.patch(
    '/store/product-categories/add',
    authMiddleware,
    addProductsCategory
  )
  router.patch(
    '/store/product-categories/delete/:id',
    authMiddleware,
    deleteProductsCategory
  )
  router.patch(
    '/store/product-categories/update/:id',
    authMiddleware,
    editProductsCategory
  )

  router.get('/store/:slug', getStoreBySlug)
}
