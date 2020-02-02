let jwt = require("jsonwebtoken");
let config = require("config");

function Userauth(req , res, next){
    let token= req.header("x-auth-token");
    try{
        if(!token) {
            return res.status(404).send({message:"not found"})
    
        }
        const decoded = jwt.verify(token , config.get("apitoken"));
        req.user = decoded;
        req.user._id;
        next();

    }
    catch(ex)
    {
        return res.status(402).send({message :" access denied"})
    }





};
 module.exports = Userauth;