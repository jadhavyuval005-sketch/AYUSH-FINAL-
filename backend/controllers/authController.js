import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import asyncHandler from "../utils/asyncHandler.js";
import validatePassword from "../utils/passwordPolicy.js";

const indianStatesAndUts = new Set([
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]);

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const normalizeEmail = (value) => value.trim().toLowerCase();

const normalizeMobile = (value) => {
  const digits = value.replace(/\D/g, "");

  if (value.trim().startsWith("+91")) {
    return `+91 ${digits.slice(-10)}`;
  }

  if (digits.length === 10) {
    return `+91 ${digits}`;
  }

  if (digits.startsWith("91") && digits.length >= 12) {
    return `+${digits.slice(0, 12)}`;
  }

  return value.trim();
};

const createToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not set.");
  }

  return jwt.sign({ userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const requestOtp = asyncHandler(async (req, res) => {
  const { channel, value, purpose = "signup" } = req.body;

  if (!["email", "mobile"].includes(channel)) {
    return res.status(400).json({ message: "Channel must be email or mobile." });
  }

  if (!value || !String(value).trim()) {
    return res.status(400).json({ message: "Value is required." });
  }

  const normalizedValue = channel === "email" ? normalizeEmail(String(value)) : normalizeMobile(String(value));
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await Otp.deleteMany({ channel, targetValue: normalizedValue, purpose });
  await Otp.create({ channel, targetValue: normalizedValue, purpose, code, expiresAt });

  res.status(201).json({
    message: `${channel === "email" ? "Email" : "Mobile"} OTP sent successfully.`,
    otp: code,
  });
});

const register = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    mobile,
    emailOtp,
    mobileOtp,
    password,
    confirmPassword,
    startupName,
    ayushSector,
    stateUt,
    declarationAccepted,
  } = req.body;

  if (!fullName || !String(fullName).trim()) {
    return res.status(400).json({ message: "Full Name is required." });
  }

  if (!email || !String(email).trim()) {
    return res.status(400).json({ message: "Official Email Address is required." });
  }

  if (!mobile || !String(mobile).trim()) {
    return res.status(400).json({ message: "Mobile Number is required." });
  }

  if (!emailOtp || !String(emailOtp).trim()) {
    return res.status(400).json({ message: "Email OTP is required." });
  }

  if (!mobileOtp || !String(mobileOtp).trim()) {
    return res.status(400).json({ message: "Mobile OTP is required." });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  if (!confirmPassword) {
    return res.status(400).json({ message: "Confirm Password is required." });
  }

  if (!startupName || !String(startupName).trim()) {
    return res.status(400).json({ message: "Startup Name is required." });
  }

  if (!Array.isArray(ayushSector) || ayushSector.length === 0) {
    return res.status(400).json({ message: "AYUSH Sector is required." });
  }

  if (!stateUt || !String(stateUt).trim()) {
    return res.status(400).json({ message: "State / UT is required." });
  }

  if (!declarationAccepted) {
    return res.status(400).json({ message: "Please accept the declaration to continue." });
  }

  const trimmedStartupName = String(startupName).trim();
  const startupNameIsValid =
    /^[A-Za-z0-9 .&-]{3,100}$/.test(trimmedStartupName) &&
    !/^[0-9]+$/.test(trimmedStartupName) &&
    /^[A-Za-z0-9]/.test(trimmedStartupName) &&
    !/[.&-]{3,}/.test(trimmedStartupName);

  if (!startupNameIsValid) {
    return res.status(400).json({ message: "Startup Name is not valid." });
  }

  if (!indianStatesAndUts.has(String(stateUt).trim())) {
    return res.status(400).json({ message: "Please select a valid State / UT." });
  }

  const passwordError = validatePassword(String(password));
  if (passwordError) {
    return res.status(400).json({ message: passwordError });
  }

  if (String(password) !== String(confirmPassword)) {
    return res.status(400).json({ message: "Password and Confirm Password must match." });
  }

  const normalizedEmail = normalizeEmail(String(email));
  const normalizedMobile = normalizeMobile(String(mobile));

  const existingUser = await User.findOne({
    $or: [{ email: normalizedEmail }, { mobile: normalizedMobile }],
  });

  if (existingUser) {
    return res.status(409).json({ message: "An account already exists with this email or mobile number." });
  }

  const emailOtpDoc = await Otp.findOne({
    channel: "email",
    targetValue: normalizedEmail,
    purpose: "signup",
    code: String(emailOtp).trim(),
    expiresAt: { $gt: new Date() },
  });

  if (!emailOtpDoc) {
    return res.status(400).json({ message: "Email OTP is invalid or expired." });
  }

  const mobileOtpDoc = await Otp.findOne({
    channel: "mobile",
    targetValue: normalizedMobile,
    purpose: "signup",
    code: String(mobileOtp).trim(),
    expiresAt: { $gt: new Date() },
  });

  if (!mobileOtpDoc) {
    return res.status(400).json({ message: "Mobile OTP is invalid or expired." });
  }

  const passwordHash = await bcrypt.hash(String(password), 10);

  const user = await User.create({
    fullName: String(fullName).trim(),
    email: normalizedEmail,
    mobile: normalizedMobile,
    passwordHash,
    startupName: trimmedStartupName,
    ayushSector,
    stateUt: String(stateUt).trim(),
    verification: {
      emailOtpVerified: true,
      mobileOtpVerified: true,
      declarationAccepted: Boolean(declarationAccepted),
    },
  });

  await Otp.deleteMany({
    targetValue: { $in: [normalizedEmail, normalizedMobile] },
    purpose: "signup",
  });

  const token = createToken(user._id.toString());

  res.status(201).json({
    message: "Account created successfully.",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      startupName: user.startupName,
      ayushSector: user.ayushSector,
      stateUt: user.stateUt,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !String(identifier).trim()) {
    return res.status(400).json({ message: "Email ID or Mobile Number is required." });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  const lookupValue = String(identifier).trim();
  const query = lookupValue.includes("@")
    ? { email: normalizeEmail(lookupValue) }
    : { mobile: normalizeMobile(lookupValue) };

  const user = await User.findOne(query).select("+passwordHash");

  if (!user) {
    return res.status(401).json({ message: "Invalid login credentials." });
  }

  const isPasswordValid = await bcrypt.compare(String(password), user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid login credentials." });
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = createToken(user._id.toString());

  res.json({
    message: "Login successful.",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      startupName: user.startupName,
      ayushSector: user.ayushSector,
      stateUt: user.stateUt,
    },
  });
});

export { requestOtp, register, login };