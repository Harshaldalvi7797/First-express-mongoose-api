let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

// let joi = require("@hapi/joi");
let User = require("../dbModel/user");


//Fetch data

router.get("/fetchuser", async (req, res) => {
    let data = await User.userModel.find();
    res.send({ d: data });
})



//Fetch data by Id
router.get("/fetchuser/:id", async (req, res) => {
    let user = await User.userModel.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid id" }) }
    res.send({ data: user });
})

//insert data
router.post("/createuser", async (req, res) => {

    let user = User.userModel.findOne({ "UserLogin.EmailId": req.body.UserLogin.EmailId });
    if (!user) {
        return res.status(403).send({ message: "user exist" })
    }
    let { error } = User.validationError(req.body);
    if (error) {
        return res.send(error.details[0].message);
    }

    // @ts-ignore
    let newuser = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Mobileno: req.body.Mobileno,
        UserLogin: req.body.UserLogin
    })

    let salt = await bcrypt.genSalt(10);
    // @ts-ignore
    newuser.UserLogin.password = await bcrypt.hash(newuser.UserLogin.password, salt);



    let data = await newuser.save();
    res.send({ message: "thanks", d: data })
})


//update data

router.put("/updateuser/:id", async (req, res) => {
    let user = await User.userModel.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid id" }) }
    // res.send({ data: user });

    let { error } = User.validationError(req.body);
    if (error) {
        return res.send(error.details[0].message);
    }

    user.FirstName = req.body.FirstName,
        // @ts-ignore
        user.LastName = req.body.LastName,
        // @ts-ignore
        user.Mobileno = req.body.Mobileno,
        // @ts-ignore
        user.UserLogin.EmailId = req.body.UserLogin.EmailId,
        // @ts-ignore
        user.UserLogin.password = req.body.UserLogin.password

    let data = await user.save();
    res.send({ message: "data updates", d: data })

});



//remove data

router.delete("/removeUser/:id", async (req, res) => {
    let data = await User.userModel.findByIdAndRemove(req.params.id);
    if (!data) {
        res.status(404).send({ message: "Invalid User Id" });
    }
    res.send({ message: "Thank You! Come Back Again:)" });
})

// router.delete()

// function validationError(error) {
//     let schema = joi.object({
//         FirstName: joi.string().min(3).max(25).required(),
//         LastName: joi.string().min(3).max(25).required(),
//         Mobileno: joi.string().min(10).max(250).required(),
//         UserLogin: {
//             EmailId: joi.string().required().email(),
//             password: joi.string().required()
//         }


//     })
//     return schema.validate(error);
// }
module.exports = router;