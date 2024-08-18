import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication";
import { ProductModel } from "../models/products";
import { UserModel } from "../models/users";



export interface Query {
  page?: string;
  limit?: string;
  [key: string]: any; 
}



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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, per_page } = req.query as Query;
  const pageNumber = parseInt(page, 10) || 1;
  const limit = parseInt(per_page, 10) || 10;
  const { storeId } = req.params;

  try {
    const products = await ProductModel.find({
      ...req.query,
      store: storeId,
    })
      .select("-store")
      .limit(limit * 1)
      .skip((pageNumber - 1) * limit)
      .sort({ createdAt: -1 });
      
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


            