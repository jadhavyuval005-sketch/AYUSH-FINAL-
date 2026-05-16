import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    channel: {
      type: String,
      enum: ["email", "mobile"],
      required: true,
    },
    targetValue: {
      type: String,
      required: true,
      trim: true,
    },
    purpose: {
      type: String,
      default: "signup",
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
    verifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;