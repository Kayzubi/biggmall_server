import {
  addNewProduct,
  getStoreProducts,
  getProductsByStoreId,
  updateProduct,
  deleteProduct,
  getProductById,
  addProductVariant,
  deleteProductVariant,
} from '../controllers/product'
import { Router } from 'express'
import {
  authMiddleware,
  isOwnerActiveStore,
  isOwnerActiveStoreProduct,
} from '../middlewares/authentication'

export default (router: Router) => {
  router.post('/products', authMiddleware, isOwnerActiveStore, addNewProduct)
  router.patch(
    '/product/:id',
    authMiddleware,
    isOwnerActiveStoreProduct,
    updateProduct
  )
  router.patch(
    '/product/:id/variant',
    authMiddleware,
    isOwnerActiveStoreProduct,
    addProductVariant
  )
  router.delete(
    '/product/:id/variant/:variant_id',
    authMiddleware,
    isOwnerActiveStoreProduct,
    deleteProductVariant
  )

  router.delete(
    '/products/:id',
    authMiddleware,
    isOwnerActiveStoreProduct,
    deleteProduct
  )

  router.get('/products', authMiddleware, getStoreProducts)
  router.get('/products/:storeId', getProductsByStoreId)
  router.get('/product/:id', getProductById)
}
