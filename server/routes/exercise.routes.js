const exercise = require('../controllers/exercise.controller');

module.exports = function(app) {
  app.get("/api/routines/:id/exercises", exercise.getAllExercisesForRoutine);
  app.get("/api/exercises/:id", exercise.getOneExercise);
  app.post("/api/exercises", exercise.createExercise);
  app.put("/api/exercises/:id", exercise.updateExercise);
  app.delete("/api/exercises/:id", exercise.deleteExercise);
}