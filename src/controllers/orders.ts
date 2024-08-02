import express, { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "middlewares/authentication";
import { OrderModel } from "../models/products";
import { UserModel } from "../models/users";

export const createNewOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const details = req.body;

  try {
    const newOrder = await OrderModel.create(details);

    res.success(newOrder, "Order Created Successfully");
  } catch (error) {
    next(error);
  }
};

export const getStoreOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id;

  try {
    const user = await UserModel.findById(user_id);

    const storeOrders = await OrderModel.find({ store: user.active_store });

    res.success(storeOrders, "List of Store Orders");
  } catch (error) {
    next(error);
  }
};

export const getCustomerOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {

    const storeOrders = await OrderModel.find({ customer_id: id });

    res.success(storeOrders, "List of Customers Orders");
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const details = req.body;
  try {
    const order = await OrderModel.findByIdAndUpdate(id, details, {
      new: true,
    });

    res.success(order, "Order Updated Successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findByIdAndDelete(id);

    res.success(order, "Order Updated Successfully");
  } catch (error) {
    next(error);
  }
};
