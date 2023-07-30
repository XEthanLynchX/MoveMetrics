const exercise = require('../controllers/exercise.controller');

//This is where we define our routes
//We are going to use this in our server.js
module.exports = function(app) {
  app.get("/api/exercises", exercise.getAllExercises);
  app.get("/api/exercises/:id", exercise.getOneExercise);
  app.post("/api/exercises", exercise.createExercise);
  app.put("/api/exercises/:id", exercise.updateExercise);
  app.delete("/api/exercises/:id", exercise.deleteExercise);
}