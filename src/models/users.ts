import { NextFunction } from 'express'
import { Schema, Document, model } from 'mongoose'
import { hash, genSaltSync, compare } from 'bcrypt'

interface IUser {
  name: string
  email: string
  password: string
  role: string
  phone: string
  active_store: any
  dashboard_theme: 'dark' | 'dark-blue' | 'light'
}

export interface IUserModel extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>
}

const usersSchema: Schema<IUserModel> = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['Shop Admin', 'Team member'],
      default: 'Shop Admin',
    },
    phone: {
      type: String,
    },
    active_store: {
      type: Schema.Types.ObjectId,
      ref: 'Stores',
    },
    dashboard_theme: {
      type: String,
      enum: ['light', 'dark', 'dark-blue'],
      default: 'light',
    },
  },
  {
    timestamps: true,
  }
)

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    store: { type: Schema.Types.ObjectId, ref: 'Stores' },
    billing_address: {
      address: { type: String },
      city: { type: String },
      postal_code: { type: String },
      state: { type: String },
      country: { type: String },
    },
  },
  {
    timestamps: true,
  }
)

usersSchema.pre('save', async function (next: NextFunction) {
  const user = this
  try {
    if (!user.isModified('password')) return next()

    const salt = genSaltSync(10)
    this.password = await hash(this.password, salt)
    next()
  } catch (error) {
    return next(error)
  }
})

usersSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password)
}

customerSchema.pre('save', async function (next: NextFunction) {
  const user = this
  try {
    if (!user.isModified('password')) return next()

    const salt = genSaltSync(10)
    this.password = await hash(this.password, salt)
    next()
  } catch (error) {
    return next(error)
  }
})

customerSchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return await compare(enteredPassword, this.password)
}

export const UserModel = model('Users', usersSchema)
export const customerModel = model('Customers', customerSchema)
