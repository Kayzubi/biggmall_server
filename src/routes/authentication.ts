import { Router } from 'express'
import {
  registerUser,
  retrieveSession,
  signInUser,
  updateUser,
  deleteUser,
} from '../controllers/authentication'
import { authMiddleware } from '../middlewares/authentication'

export default (router: Router) => {
  router.post('/auth/register', registerUser)
  router.post('/auth/login', signInUser)
  router.get('/auth/retrieve-session', retrieveSession)

  router.patch('/auth/user', authMiddleware, updateUser)
  router.delete('/auth/user', authMiddleware, deleteUser)
}
