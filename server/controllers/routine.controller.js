const Routine = require("../models/routine.model");
const { deleteExercises } = require("../../middleware/routineMiddleware");


//To create a routine
module.exports.createRoutine = (req, res) => {
    const user = req.user;
    const routine = new Routine({ ...req.body, userId: user._id }); 
      //This has to be a 400 because it is a validation error and it wont show on front end validation
    routine
      .save()
      .then((routine) => res.json(routine))
      .catch((err) => res.status(400).json(err));
  };


//To get all routines
module.exports.getAllRoutines = (req, res) => {
  const user = req.user; // Get the currently logged in user from the request object
  Routine.find({ userId: user._id }) // Only return routines with a userId that matches the ID of the currently logged in user
    .then((routines) => res.json(routines))
    .catch((err) => res.json({ message: "Something went wrong (findall)", error: err }));
};


//To get one routine
module.exports.getOneRoutine = (req, res) => {
    Routine.findOne({_id: req.params.id})
      .then(routine => res.json(routine))
        .catch(err => res.json({message: "Something went wrong (findone)", error: err}));
},

//To update a routine
module.exports.updateRoutine = (req, res) => {
  const user = req.user; // Get the currently logged in user from the request object
  Routine.findOneAndUpdate(
    { _id: req.params.id, userId: user._id }, // Only update routines with a matching ID and userId
    req.body,
    { new: true, runValidators: true }
  )
    .then((updatedRoutine) => res.json(updatedRoutine))
    .catch((err) => res.status(400).json(err));
};

//To delete a routine
module.exports.deleteRoutine = async (req, res) => {
  const user = req.user; // Get the currently logged in user from the request object
  try {
    const routine = await Routine.findOne({ _id: req.params.id, userId: user._id }); // Only delete routines with a matching ID and userId

    if (!routine) {
      return res.status(404).json({ message: "Routine not found." });
    }

    await deleteExercises(routine._id);
    await routine.deleteOne();

    res.json({ message: "Routine deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};




