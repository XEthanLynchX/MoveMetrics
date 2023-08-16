const mongoose = require("mongoose");
const Exercise = require("./exercise.model");


const routineSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, "Routine name is required."],
    minlength: [3, "Routine name must be at least 3 characters long."], 
    maxlength: [16, "Routine name must be less than 16 characters long."]
  },

  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: [true, "Routine exercises are required."]
  }],

  time: {
    type: Number,
    required: [true, "Routine time is required."],
    min: [1, "Routine time must be at least 1 minute long."],
    max: [210, "Routine time must be less than 210 minutes long."]
  },

  difficulty: {
      type: Number,
      required: [true, "Routine difficulty is required."],
    },

  description: {
    type: String,
    required: [true, "Routine description is required."],
    minlength: [3, "Routine description must be at least 3 characters long."],
    maxlength: [255, "Routine description must be less than 255 characters long."]
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "user_id is required."]
  }

}, {timestamps: true});

routineSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    await Exercise.deleteMany({ routineId: this._id });
    console.log("Deleted exercises for routine", this._id);
    next();
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting exercises.");
  }
});

module.exports = mongoose.model("Routine", routineSchema);
