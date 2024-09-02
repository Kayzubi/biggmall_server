import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserModel } from '../models/users'
import { ProductModel } from '../models/products'
import { CustomError } from './errorHandler'

export interface AuthenticatedRequest extends Request {
  user_id?: string | object
  user_store?: string
}

export const isOwnerActiveStore = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id

  const { store } = req.body

  try {
    const user = await UserModel.findById(user_id)

    if (!user) throw new CustomError('Not Authorized', 401)

    req.user_store = user.active_store
    next()
  } catch (error) {
    next(error)
  }
}

export const isOwnerActiveStoreProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id
  const { id } = req.params

  try {
    const user = await UserModel.findById(user_id)

    const product = await ProductModel.findById(id)

    if (user.active_store.toString() != product.store.toString())
      throw new CustomError('Not Authorized', 401)

    next()
  } catch (error) {
    next(error)
  }
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')

  if (!token) throw new CustomError('Authentication token missing', 401)

  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET
    ) as JwtPayload
    req.user_id = decoded._id
    next()
  } catch (err) {
    next(err)
  }
}
