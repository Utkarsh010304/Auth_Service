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
        return res.status(error.statusCode).json({
            message: error.message,
            success:false,
            err: error.explanation,
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

const isAuthenticated =async(req,res) => {
    try{
        const token = req.headers['x-access=token'];
        const response =await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: "token is valid"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong User not genuine",
            success:false,
            err: error,
            data: {}
        });
    }
}

const isAdnin = async(req,res) =>{
    try{
        const response =await UserService.isAdnin(req.body.id);
        return res.status(200).json({
            err:{},
            data: response,
            message: 'Successfully fetched user is admin or not',
            success: true
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong User not genuine",
            success:false,
            err: error,
            data: {}
        });
    }
}
module.exports={
    create, 
    signIn,
    isAuthenticated,
    isAdnin
}