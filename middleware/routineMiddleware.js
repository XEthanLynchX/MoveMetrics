const Exercise = require("../server/models/exercise.model");

const deleteExercises = async (routineId) => {
  try {
    await Exercise.deleteMany({ routine_id: routineId }); // Use deleteMany() to delete all exercises with a matching routine_id
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting exercises.");
  }
};

module.exports = { deleteExercises };