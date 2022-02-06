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
});

module.exports = model('User', userSchema);
