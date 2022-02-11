import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 4,
    required: true,
  },
  money: {
    type: Number,
  },
  bought: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  selling: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  sold: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  active: {
    type: Boolean,
    required: true,
  },
});

export = model('User', userSchema);
