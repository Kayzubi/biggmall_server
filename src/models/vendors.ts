import { NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose"; 
import { hash, genSaltSync, compare } from "bcrypt";


interface IUser {
  name: string;
  email: string;
  password: string;
  role: string
  phone: string 
  active_store: any
}

export interface IUserModel extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const usersSchema: Schema<IUserModel> = new mongoose.Schema(
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
      enum: ["Shop Admin", "Team member"],
      default: "Shop Admin",
    },
    phone: {
      type: String,
    },
    active_store: {
      type: Schema.Types.ObjectId,
      ref: "Stores",
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", async function (next: NextFunction) {
   const user = this;
  try {

    if (!user.isModified("password")) return next();

    const salt = genSaltSync(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

usersSchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return await compare(enteredPassword, this.password);
};


export const UserModel = mongoose.model("Users", usersSchema);
