const { mongoose } = require("../configs/dbConnect");

const reserVationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },

    arrival_date: {
      type: Date,
      required: true,
    },

    departure_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (departure_date) {
          return departure_date > this.arrival_date;
        },
        message: "Departure date must be greater than arrival date",
      },
    },
    guest_number: {
      type: Number,
      required: true,
    },
    night: {
      type: Number,
      default: function () {
        const nights =
          this.departure_date.getTime() - this.arrival_date.getTime();
        return Math.floor(nights / (1000 * 3600 * 24));
      },

      transform: function () {
        const nights =
          this.departure_date.getTime() - this.arrival_date.getTime();
        return Math.floor(nights / (1000 * 3600 * 24));
      },
    },

    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: function () {
        return this.night * this.price;
      },
      transform: function () {
        return this.night * this.price;
      },
    },
  },
  {
    collection: "reservation",
    timestamps: true,
  }
);

module.exports = mongoose.model("reservation", reserVationSchema);
