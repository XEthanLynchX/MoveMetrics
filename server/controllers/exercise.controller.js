const Exercise = require('../models/exercise.model');
const Routine = require('../models/routine.model');

//To create an exercise
module.exports.createExercise = async (req, res) => {
  const { routineId, ...exerciseData } = req.body;

  try {
    // Check if the routine exists
    const routine = await Routine.findById(routineId);
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found.' });
    }

    // Create the exercise
    const exercise = await Exercise.create({
      ...exerciseData,
      routineId: routine._id,
    });

    // Add the exercise ID to the routine's exercises array
    routine.exercises.push(exercise._id);
    await routine.save();
    console.log(routine);
    

    return res.json(exercise);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//To get all exercises
module.exports.getAllExercises = (req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.json({message: "Something went wrong (findall)", error: err}));
}

//To get one exercise
module.exports.getOneExercise = (req, res) => {
  Exercise.findOne({_id: req.params.id})
    .then(exercise => res.json(exercise))
    .catch(err => res.json({message: "Something went wrong (findone)", error: err}));
}

//To update an exercise
module.exports.updateExercise = (req, res) => {
  Exercise.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    {new: true, runValidators: true}
  )
    .then(updatedExercise => res.json(updatedExercise))
    .catch(err => res.status(400).json(err));
}

//To delete an exercise
module.exports.deleteExercise = (req, res) => {
  const exerciseId = req.params.id;

  // Find the exercise and the routine it's associated with
  Exercise.findByIdAndDelete(exerciseId)
    .then(deletedExercise => {
      if (!deletedExercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }

      const routineId = deletedExercise.routineId;

      // delete the exercise from the routine's exercises array
      if (routineId) {
        Routine.findByIdAndUpdate(
          routineId,
          { $pull: { exercises: exerciseId } },
          { new: true }
        )
          .then(updatedRoutine => {
            if (!updatedRoutine) {
              return res.status(404).json({ message: 'Routine not found' });
            }
            res.json({ message: 'Exercise deleted successfully' });
          })
          .catch(err => res.status(400).json({ message: 'Error updating routine', error: err }));
      } else {
        res.json({ message: 'Exercise deleted successfully' });
      }
    })
    .catch(err => res.status(400).json({ message: 'Error deleting exercise', error: err }));
};


