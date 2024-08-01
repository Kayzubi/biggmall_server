import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/users";
import { ProductModel } from "../models/products";

export interface AuthenticatedRequest extends Request {
  user_id?: string | object;
}

export const isOwnerActiveStore = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id;
  const { store } = req.body;

  try {
    const user = await UserModel.findById(user_id);

    if (user.active_store != store)
      return res.status(401).send({ message: "Not Authorized" });

    next();
  } catch (error) {
    res.status(401).send({ message: "Not Authorized" });
  }
};


export const isOwnerActiveStoreProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id;
  const { id } = req.params

  try {
    const user = await UserModel.findById(user_id);

    const product = await ProductModel.findById(id)


    if (user.active_store.toString() != product.store.toString())
      return res
        .status(401)
        .send({
          message: "Not Authorized"
        });

    next();
  } catch (error) {
    res.status(401).send({ message: "Not Authorized" });
  }
};

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ emessage: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    ) as JwtPayload;
    req.user_id = decoded._id;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
};
