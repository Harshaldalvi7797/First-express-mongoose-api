

function Admin(req,res,next)
{
    if(!req.user.isAdmin)
    {
        return res.status(402).send({message:"access denied Admin"})
    }
    next();
}
module.exports= Admin;