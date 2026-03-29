const UserService = require("../services/user-service");
const { response } = require("express");

const userService = new UserService();

const create = async(req,res) => {
    try{
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({
            success: true,
            message: "Created a new User",
            data: response,
            err: {}
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success:false,
            err: error,
            data: {}
        });
    }
}

const signIn = async(req,res) =>{
        try{
            const response = await userService.signIn(req.body.email, req.body.password);
            return res.status(200).json({
            success: true,
            message: "Successfully Sign-In",
            data: response,
            err: {}
        });
        }
        catch(error){
            console.log(error);
        return res.status(500).json({
            message: "Something went wrong in sign controller",
            success:false,
            err: error,
            data: {}
        });
    }
}
module.exports={
    create, 
    signIn
}