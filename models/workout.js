const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      name: {
        type: String,
        trim: true,
        required: "Workout Name is Required"
      },

      type: {
        type: String,
        required: true
      },

      weight: {
        type: Number,
      },

      sets: Number,

      reps: Number,

      duration: Number,

      distance: Number
    }]
    });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;