let express= require("express");
let router = express.Router();
let User = require("../dbModel/user");

router.post("/pagination/:page", async (req,res)=>
{
    let perPage=2;
    let currentPage = req.params.page || 1;
    let data =  await User.userModel
    .find()
    .skip((perPage * currentPage) - perPage)
    .limit(perPage)

    let totalcount = await User.userModel.find().count();
    let totalPages = Math.ceil(totalcount / perPage);
    res.send({
        perPage :perPage,
        currentPage:currentPage,
        data:data,
       totalPages:totalPages
    })

});

module.exports= router;