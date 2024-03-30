const { mongoose } = require("../configs/dbConnect");
const passEncrypt = require("../helper/passEncrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passEncrypt(password),
    },
    email: {
      type: String,
      trim: true,
      required: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "userSchema",
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
