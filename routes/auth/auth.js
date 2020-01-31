let express = require("express");
let router = express.Router();
let User = require("../../dbModel/user");
let joi = require("@hapi/joi");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

router.post("/auth", async (req, res) => {

    let { error } = authvalidation(req.body);
    if (error) { return res.send(error.details[0].message) };

    let user = await User.userModel.findOne({ "UserLogin.EmailId": req.body.UserLogin.EmailId });
    if (!user) { return res.status(403).send({ message: "invalid user id" }) }

    // let password = await User.findOne({ "UserLogin.password": req.body.UserLogin.password });
    // if (!password) { return res.status(403).send({ message: "invalid password" }) }
    // @ts-ignore
    let password = await bcrypt.compare(req.body.UserLogin.password, user.UserLogin.password);
    if (!password) { return res.status(403).send({ message: "invalid password" }) }

    let token = jwt.sign({ _id: user._id }, "jwtprivatekey");
    res.send({ message: " login succesfully", token: token })

})


function authvalidation(error) {
    let Schema = joi.object({
        UserLogin: {
            EmailId: joi.string().required(),
            password: joi.string().required()
        }
    })

    return Schema.validate(error);

};

module.exports = router;