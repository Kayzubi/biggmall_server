import express, { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "middlewares/authentication";
import { OrderModel } from "models/products";

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
