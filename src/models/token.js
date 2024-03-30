const { mongoose } = require("../configs/dbConnect");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    token: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "token",
    timestamps: true,
  }
);

module.exports = mongoose.model("token", tokenSchema);
