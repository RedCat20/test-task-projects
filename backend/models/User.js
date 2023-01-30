import mongoose from 'mongoose';

export const UserModel = new mongoose.Schema({
    email: {
      unique: true,
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', UserModel);