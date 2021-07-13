const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  type:

  {
    type: String,
    trim: true,

  },

  name: Number,


  weight: Number,

  sets: Number,

  reps: Number,

  duration: Number,

  distance: Number

});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;