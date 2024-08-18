import {
  addNewProduct,
  getStoreProducts,
  getStoreProductsById,
  updateProduct,
  deleteProduct,
} from '../controllers/product'
import { Router } from 'express'
import {
  authMiddleware,
  isOwnerActiveStore,
  isOwnerActiveStoreProduct,
} from '../middlewares/authentication'

export default (router: Router) => {
  router.post(
    '/products/:storeId',
    authMiddleware,
    isOwnerActiveStore,
    addNewProduct
  )
  router.patch(
    '/products/:id',
    authMiddleware,
    isOwnerActiveStoreProduct,
    updateProduct
  )
  router.delete(
    '/products/:id',
    authMiddleware,
    isOwnerActiveStoreProduct,
    deleteProduct
  )

  router.get('/products/:storeId', getStoreProducts)
  router.get('/products/:id', getStoreProductsById)
}
