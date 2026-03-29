const validateUserAuth = (req, res, next) =>{
    if(!req.body.email || !req.body.paassword){
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: "Email or password missing"
        });
    }
    next();
}
module.exports= {
    validateUserAuth
}