const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(" ")[1]; 
    if(token){
      jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
        if (err) {
          return res.status(403).json({status:'error',message:"error when checking token"})
        }
        if(data.user_role!="admin"){
            return res.status(403).json({status:'error',message:"forbidden"})
        }
        req.user_id=data.user_id;
            req.user_role = data.user_role;
            next();
      })
    }
  }
  else{
    return res.status(403).json({status:'error',message:"token cannot be empty"})
  }
}