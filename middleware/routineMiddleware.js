const Exercise = require("../models/exercise.model");

const deleteExercises = async (routineId) => {
  try {
    await Exercise.deleteMany({ routine_id: routineId });
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting exercises.");
  }
};

module.exports = { deleteExercises };