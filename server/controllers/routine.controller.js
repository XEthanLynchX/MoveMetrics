const Routine = require("../models/routine.models");

module.exports.createRoutine = (req, res) => {
    Routine.create(req.body)
      .then(routine => res.json(routine))
        .catch(err => res.json({message: "Something went wrong (create) ", error: err}));
},

module.exports.getAllRoutines = (req, res) => {
    Routine.find()
      .then(routines => res.json(routines))
        .catch(err => res.json({message: "Something went wrong (findall)", error: err}));
},

module.exports.getOneRoutine = (req, res) => {
    Routine.findOne({_id: req.params.id})
      .then(routine => res.json(routine))
        .catch(err => res.json({message: "Something went wrong (findone)", error: err}));
},

module.exports.updateRoutine = (req, res) => {
  Routine.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    {new: true, runValidators: true}
  )
    .then(updatedRoutine => res.json(updatedRoutine))
    .catch(err => res.json({message: "Something went wrong (update)", error: err}));
},

module.exports.deleteRoutine = (req, res) => {
  Routine.deleteOne({_id: req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json({message: "Something went wrong (delete)", error: err}));
}; 



