import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    store: { type: Schema.Types.ObjectId, ref: "Stores" },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: {
      is_managed: { type: Boolean, default: false },
      available: { type: Number, default: 0 },
    },
    variants: [
      {
        group_name: { type: String },
        options: [
          {
            type: String,
          },
        ],
      },
    ],
    images: [{ type: String }],
  },

  {
    timestamps: true,
  }
);

const orderSchema = new Schema(
  {
    store: { type: Schema.Types.ObjectId, ref: "Stores" },
    customer_id: { type: Schema.Types.ObjectId, ref: "Customers" },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },
    cart_id: { type: String },
    line_items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variant: [
          {
            group_name: { type: String },
            selected_option: { type: String },
          },
        ],
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shipping_address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postal_code: { type: String, required: true },
      country: { type: String, required: true },
    },
    sub_total: { type: Number, required: true },
    shipping_price: { type: Number, required: true },
    total_price: { type: Number, required: true },
    payment: {
      status: {
        type: String,
        enum: ["paid", "payment_on_delivery", "not_paid"],
        default: 'not_paid'
      },
      payment_method: { type: String },
      transaction_id: { type: String },
    },
    fulfillment: {
      type: String,
      enum: ["fulfilled", "out_for_delivery", "not_fulfilled", "processing"],
      default: 'not_fulfilled'
    },
  },
  {
    timestamps: true,
  }
);

const cartSchema = new Schema(
  {
    cart_id: { type: String, required: true },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model("Products", productSchema);
export const OrderModel = model("Orders", orderSchema);
export const CartModel = model("Cart", cartSchema);
