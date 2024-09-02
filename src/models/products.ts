import { NextFunction } from 'express'
import { generateSlug } from '../helpers'
import { Schema, model } from 'mongoose'

const productSchema = new Schema(
  {
    store: { type: Schema.Types.ObjectId, ref: 'Stores' },
    slug: { type: String },
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    on_sale: {
      is_on_sale: { type: Boolean },
      sale_price: { type: Number },
    },
    categories: [{ type: String }],
    available_quantity: { type: Number, default: 0 },
    has_variants: { type: Boolean, default: false },
    variants: [
      {
        group_name: { type: String },
        options: [
          {
            name: { type: String },
            quantity: { type: Number },
          },
        ],
      },
    ],
    images: [{ type: String }],
  },

  {
    timestamps: true,
  }
)

productSchema.pre('save', function (next: NextFunction) {
  const product = this

  if (!product.slug) {
    this.slug = generateSlug(product.name)
  }

  next()
})

export const ProductModel = model('Products', productSchema)
