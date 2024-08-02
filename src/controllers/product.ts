import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication";
import { ProductModel } from "../models/products";
import { UserModel } from "../models/users";

export const addNewProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const productDetails = req.body;

    const newProduct = await ProductModel.create(productDetails);

    res.success(newProduct, "New Product added");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const productDetails = req.body;

    const newProduct = await ProductModel.findByIdAndUpdate(
      id,
      productDetails,
      { new: true }
    );

    res.success(newProduct, "Product Updated");
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(id);

    res.success(null, "Product Deleted");
  } catch (error) {
    next(error);
  }
};

export const getStoreProducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id;

  try {
    const user = await UserModel.findById(user_id);

    const products = await ProductModel.find({
      store: user.active_store,
    }).select("-store");

    res.success(products, "List of store products");
  } catch (error) {
    next(error);
  }
};

export const getStoreProductsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const products = await ProductModel.find({ store: id }).select("-store");

    res.success(products, "List of store products");
  } catch (error) {
    next(error);
  }
};
