let mongoose = require("mongoose");
let joi = require("@hapi/joi");
let jwt = require("jsonwebtoken");
let config = require("config");

let userSchema = new mongoose.Schema({

    FirstName: { type: String, min: 3, max: 250, alphanum: true, trim: true },
    LastName: { type: String, min: 4, max: 250, alphanum: true, trim: true },
    Mobileno: { type: Number, required: true },
    UserLogin: {
        EmailId: { type: String, required: true, unique: true },
        password: { type: String, required: true }

        // EmailId: { type: String, required: true, unique: true },
        // password: { type: String, required: true }
    },
    isAdmin:{ type:Boolean}

})

userSchema.methods.UserToken = function()
{
 let token = jwt.sign({ _id: this._id, isAdmin:this.isAdmin } , config.get("apitoken"));
 return token;
}


let userModel = mongoose.model("users", userSchema);


function validationError(error) {
    let schema = joi.object({
        FirstName: joi.string().min(3).max(25).required(),
        LastName: joi.string().min(3).max(25).required(),
        Mobileno: joi.string().min(10).max(250).required(),
        UserLogin: {
            EmailId: joi.string().required().email(),
            password: joi.string().required()
        }


    })
    return schema.validate(error);
}

module.exports = { userModel, validationError };
