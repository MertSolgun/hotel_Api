const { mongoose } = require("../configs/dbConnect");

const roomSchema = new mongoose.Schema(
  {
    room_number: {
      type: Number,
      required: true,
    },
    image: [],
    bed_type: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "room",
    timestamps: true,
  }
);

module.exports = mongoose.model("room", roomSchema);
