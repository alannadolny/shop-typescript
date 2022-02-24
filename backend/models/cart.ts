import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
  active: {
    type: Boolean,
    required: true,
  },
});

export = model('Cart', cartSchema);
