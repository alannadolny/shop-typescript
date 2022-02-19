import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  added: {
    type: Date,
    required: true,
  },
  sold: {
    type: Date,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export = model('Product', productSchema);
