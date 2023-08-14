const jwt = require("jsonwebtoken");
const User = require("../server/models/user.model");

const requireAuth = async (req, res, next) => {
  //verify authentification token
  const {authorization} = req.headers;

  if(!authorization){
    return res.status(401).json({error: "You must be logged in"});
  }


  const token = authorization.split(" ")[1];
  
  try {
    const {_id} = jwt.verify(token, process.env.SECRET)

    //This is to return only the id of the user
    req.user = await User.findById({_id}).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error: "Request not authorized"});
    
  }

}

module.exports = requireAuth;





  