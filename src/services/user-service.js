const UserRepository = require("../repository/user-repsoitory");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt =require("bcrypt");

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user;
        }
        catch(error){
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async signIn(email, PlainPassword ) {
        try{
            const user =await this.userRepository.getByEmail(email);
            const passwordsMatch = this.checkPassword(PlainPassword,user.password);

            if(!passwordsMatch){
                console.log("password Doesn't match");
                throw{error: "Incorrect Password"};
            }

            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;

        }
        catch(error){
            console.log("Something went wrong in SignIn");
            throw error;
        }
    }

    createToken(user) {
        try{
            const result = jwt.sign(user, JWT_KEY ,{expiresIn: '1d'});
            return result;
        }
        catch(error){
            console.log("Something went wrong in token Creation");
            throw error;
        }
    }

    verifyToken(token) {
        try{
            const response = jwt.verify(token, JWT_KEY);
            return response;
        }
        catch(error){
            console.log("Something went wrong in repository layer", error);
            throw error;
        }
    }

    checkPassword(PlainPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(PlainPassword,encryptedPassword);
        }
        catch(error){
            console.log("Something went wrong in Password Comparison");
            throw error;
        }
    }

    
}

module.exports=UserService;