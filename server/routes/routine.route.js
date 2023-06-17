const routine = require("../controllers/routine.controller");

module.exports = function(app) {
  app.get("/api/routines", routine.getAllRoutines);
  app.get("/api/routines/:id", routine.getOneRoutine);
  app.post("/api/routines", routine.createRoutine);
  app.put("/api/routines/:id", routine.updateRoutine);
  app.delete("/api/routines/:id", routine.deleteRoutine);
}