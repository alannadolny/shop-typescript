import mongoose from 'mongoose';

export interface Person {
  login: string;
}

export interface PersonDetails {
  login: string;
  email: string;
  money: number;
  bought: Array<mongoose.Schema.Types.ObjectId>;
  selling: Array<mongoose.Schema.Types.ObjectId>;
  sold: Array<mongoose.Schema.Types.ObjectId>;
  active: boolean;
}

export interface FoundUser {
  _id: mongoose.Schema.Types.ObjectId;
  login: string;
  password: string;
  email: string;
  money: number;
  bought: Array<mongoose.Schema.Types.ObjectId>;
  selling: Array<mongoose.Schema.Types.ObjectId>;
  sold: Array<mongoose.Schema.Types.ObjectId>;
  active: boolean;
}

export interface EditedUser {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: string;
  upsertedCount: number;
  matchedCound: number;
}
