const user = require("../controllers/user.controller.js");


module.exports = function(app) { 
  app.post("/api/login", user.loginUser);
  app.post("/api/signup", user.signup);
}
