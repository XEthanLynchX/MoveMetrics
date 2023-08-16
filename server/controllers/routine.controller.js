const Routine = require("../models/routine.model");
const { deleteExercises } = require("../middlewares/routines.middleware");

//To create a routine
module.exports.createRoutine = (req, res) => {
    Routine.create(req.body)
      .then(routine => res.json(routine))
      //This has to be a 400 because it is a validation error and it wont show on front end validation
      .catch(err => res.status(400).json(err));
},


//To get all routines
module.exports.getAllRoutines = (req, res) => {
    Routine.find()
      .then(routines => res.json(routines))
        .catch(err => res.json({message: "Something went wrong (findall)", error: err}));
},


//To get one routine
module.exports.getOneRoutine = (req, res) => {
    Routine.findOne({_id: req.params.id})
      .then(routine => res.json(routine))
        .catch(err => res.json({message: "Something went wrong (findone)", error: err}));
},

//To update a routine
module.exports.updateRoutine = (req, res) => {
  Routine.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    {new: true, runValidators: true}
  )
    .then(updatedRoutine => res.json(updatedRoutine))
      .catch(err => res.status(400).json(err));
},

//To delete a routine
module.exports.deleteRoutine = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);

    if (!routine) {
      return res.status(404).json({ message: "Routine not found." });
    }

    await Exercise.deleteMany({ routine_id: routine._id });
    await routine.deleteOne();

    res.json({ message: "Routine deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};




