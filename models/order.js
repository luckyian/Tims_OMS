const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  chips: [
    {
      name: {
        type: String,
        trim: true,
        required: "Order Name is Required"
      },

      sku: {
      type: Number,
        required: true
      },

      // weight: {
      //   type: Number,
      // },

      // sets: Number,

      // reps: Number,

      // duration: Number,

      // distance: Number
    }]
    });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;