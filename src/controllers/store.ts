import express, { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "middlewares/authentication";
import { StoreModel } from "../models/store";
import { UserModel } from "../models/vendors";

export const createNewStore = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id;
  const details = req.body;

  try {
    if (!user_id) throw new Error("User Not Found");

    const owner = await UserModel.findById(user_id);

    const foundStore = await StoreModel.findOne({ slug: details.slug });

    if (foundStore) throw new Error("Store with Slug already exists");

    const newStore = await StoreModel.create({ ...details, owner: owner._id });

    owner.active_store = newStore._id
    owner.save()
    
    res.success(newStore, 'Store Created Successfully');
  } catch (error) {
    next(error);
  }
};

export const getUserStore = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id;

  try {
    const owner = await UserModel.findById(user_id);

    const foundStore = await StoreModel.findById(owner.active_store);

    res.success(foundStore);
  } catch (error) {
    next(error);
  }
};

export const getUserStores = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id;

  try {
    const owner = await UserModel.findById(user_id);

    const foundStores = await StoreModel.find({ owner: owner._id });

    res.success(foundStores);
  } catch (error) {
    next(error);
  }
};

export const getStoreBySlug = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { slug } = req.params;

  try {
    const store = await StoreModel.findOne({ slug })
      .select("-setup_guide -coupons -remitance_account -owner")
      .exec();

    res.success(store);
  } catch (error) {
    next(error);
  }
};

export const updateStore = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id;
  const details = req.body;

  try {

    const owner = await UserModel.findById(user_id);


    const updatedStore = await StoreModel.findByIdAndUpdate(
      owner.active_store,
      details,
      {
        new: true,
      }
    );

    res.success(updatedStore, 'Store Updated Successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteStore = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user_id;

  try {

    const owner = await UserModel.findById(user_id);


    const updatedStore = await StoreModel.findByIdAndDelete(owner.active_store);

    res.success(null, 'Store deleted Successfully');
  } catch (error) {
    next(error);
  }
};
