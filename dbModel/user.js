let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({

    FirstName: { type: String, min: 3, max: 250, alphanum: true, trim: true },
    LastName: { type: String, min: 4, max: 250, alphanum: true, trim: true },
    mobileno: { type: Number, required: true },
    UserLogin: {
        EmailId: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }

})
let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
