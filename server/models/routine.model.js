const mongoose = require("mongoose");


//This is going to be the blueprint for our Routine objects in our database
//We are going to use this blueprint in our controller file
const routineSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, "Routine name is required."],
    minlength: [3, "Routine name must be at least 3 characters long."], 
    maxlength: [16, "Routine name must be less than 16 characters long."]
  },

  exercise: { 
    type: [
      {
        type: String,
        required: true,
        minlength: [5, 'Exercise(s) must be at least 5 characters long.'],
        maxlength: [500, 'Exercise(s) cannot be more than 500 characters long.'],
      },
    ],
    validate: {
      validator: function (value) {
        return value.length > 0; // Ensure the exercise array is not empty
      },
      message: 'Exercise(s) is required.',
    },
  },

  time: {
    type: Number,
    required: [true, "Routine time is required."],
    min: [1, "Routine time must be at least 1 minute long."],
    max: [210, "Routine time must be less than 210 minutes long."]
  },

  difficulty: {
      type: Number,
      required: [true, "Routine difficulty is required."],
      min: [1, "Routine difficulty must be at least 1."],
      max: [5, "Routine difficulty must be 5 or less."]
    },

  description: {
    type: String,
    required: [true, "Routine description is required."],
    minlength: [3, "Routine description must be at least 3 characters long."],
    maxlength: [255, "Routine description must be less than 255 characters long."]
  }

}, {timestamps: true});

module.exports = mongoose.model("Routine", routineSchema);

 





