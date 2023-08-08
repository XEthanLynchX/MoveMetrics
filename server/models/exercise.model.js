const mongoose = require("mongoose");

//This is going to be the blueprint for our Exercise objects in our database
//We are going to use this blueprint in our controller file
const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Exercise name is required."],
    minlength: [3, "Exercise name must be at least 3 characters long."],
    maxlength: [25, "Exercise name must be less than 25 characters long."],
  },

  load : {
    type: Number,
    required: [true, "Exercise load is required."],
    max : [1000, "Exercise load must be less than 1000."],
    
  },

  reps: {
    type: Number,
    required: [true, "Exercise reps is required."],
    min : [1, "Exercise reps must be at least 1."],
    max : [100, "Exercise reps must be less than 100."],  
  },

  sets: {
    type: Number,
    required: [true, "Exercise sets is required."],
    min : [1, "Exercise sets must be at least 1."],
    max : [10, "Exercise sets must be less than 10."],
  },

  note: {
    type: String,
    maxlength: [255, "Exercise note must be less than 255 characters long."],
  }

}, {timestamps: true});

module.exports = mongoose.model("Exercise", exerciseSchema);