import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    startupName: {
      type: String,
      required: true,
      trim: true,
    },
    ayushSector: {
      type: [String],
      default: [],
    },
    stateUt: {
      type: String,
      required: true,
      trim: true,
    },
    verification: {
      emailOtpVerified: {
        type: Boolean,
        default: false,
      },
      mobileOtpVerified: {
        type: Boolean,
        default: false,
      },
      declarationAccepted: {
        type: Boolean,
        default: false,
      },
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;