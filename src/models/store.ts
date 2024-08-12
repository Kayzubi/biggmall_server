import mongoose, { Schema } from "mongoose";

const storeModel = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    store_name: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true, unique: true },
    logo: {
      type: String,
    },
    tag_line: { type: String },
    category: { type: String },
    description: { type: String },
    store_email: { type: String },
    whatsapp: { type: String },
    store_url: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      default: "Nigeria",
    },
    setup_guide: {
      is_complete: {
        type: Boolean,
        default: false,
      },
      last_step: {
        type: Number,
        default: 1,
      },
    },
    socials: [
      {
        platform: { type: String },
        url: { type: String },
      },
    ],
    categories: [{ type: String }],
    coupons: [
      {
        code: { type: String, required: true },
        discount_type: {
          type: String,
          enum: ["Fixed", "Percentage"],
          default: "Fixed",
          required: true,
        },
        description: { type: String },
        show_on_site: { type: Boolean, default: false },
        value: { type: String, required: true },
        start_date: { type: Date, default: Date.now },
        end_Date: { type: Date },
      },
    ],
    allow_pay_on_delivery: { type: Boolean, default: false },
    remitance_account: {
      bank_name: { type: String },
      account_name: { type: String },
      account_number: { type: String },
    },
    theme: {
      active_theme: {
        type: String,
        default: "minimal",
        enum: ["minimal", "trendy", "classic", "retro", "antique"],
      },
      color: {
        primary: { type: String, default: "DA5726" },
        secondary: { type: String, default: "FFFFFF" },
      },
    },
    shipping_options: [
      {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
      },
    ],
    banners: [
      {
        header: { type: String },
        sub_text: { type: String },
        background_image: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const StoreModel = mongoose.model("Stores", storeModel);
