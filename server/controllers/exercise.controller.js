const Exercise = require('../models/exercise.model');

//To create an exercise
module.exports.createExercise = (req, res) => {
  Exercise.create(req.body)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json(err));
},

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
  exercise.deleteOne({_id: req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json({message: "Something went wrong (delete)", error: err}));
};


