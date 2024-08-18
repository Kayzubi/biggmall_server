import express, { NextFunction, Request, Response } from 'express'
import { UserModel } from '../models/users'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AuthenticatedRequest } from '../middlewares/authentication'
import { StoreModel } from '../models/store'
import { CustomError } from '../middlewares/errorHandler'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password) throw new CustomError('Invalid Credentials', 400)

    const foundUser = await UserModel.findOne({ email })

    if (foundUser)
      throw new CustomError('User with this email already exists', 401)

    const newUser = await UserModel.create({ email, password, name })

    const token = jwt.sign(
      { _id: newUser._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: '3 days',
      }
    )

    res.success({ user: newUser, token }, 'Account Created Successfully')
  } catch (error) {
    next(error)
  }
}

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  try {
    const foundUserPassword = await UserModel.findOne({ email }).select(
      'password'
    )

    if (!foundUserPassword) throw new CustomError('Account Not Found', 401)

    const isPasswordValid = await foundUserPassword.comparePassword(password)

    if (!isPasswordValid) throw new CustomError('Invalid Password', 401)

    const foundUser = await UserModel.findOne({ email })

    const token = jwt.sign(
      { _id: foundUser._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: '3 days',
      }
    )

    const activeStore = await StoreModel.findById(foundUser.active_store)

    res.success(
      { user: foundUser, token, store: activeStore },
      'Logged In Successfully'
    )
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id
  const details = req.body

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(user_id, details, {
      new: true,
    })

    res.success(updatedUser, 'Account Updated Succesfully')
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id

  try {
    const updatedUser = await UserModel.findByIdAndDelete(user_id)

    res.success(null, 'Account Deleted Succesfully')
  } catch (error) {
    next(error)
  }
}

export const retrieveSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  try {
    if (!token) {
      throw new CustomError('No Authorization token', 401)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

    const loggedinUser = await UserModel.findById(decoded._id)

    const activeStore = await StoreModel.findById(loggedinUser.active_store)

    res.success({ user: loggedinUser, store: activeStore })
  } catch (error) {
    next(error)
  }
}
