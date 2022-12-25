const UserRepository =require("../repository/user-repository")
const {JWT_KEY} = require("../config/serverConfig")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



class UserService{

    constructor(){
        this.userRepository = new UserRepository()
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);

            return user

        } catch (error) {
            console.log('error from user-service layer');
            throw error;
        }
    }
   
    async signIn(email,plainPassword){
        try {
            //  step one - fetch user by email
            const user = await this.userRepository.getUserByEmail(email); 

            // step two - compare plain incoming password with stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordsMatch){
                console.log("password doesnt match")
                throw {error:"incorrect password"}
            }

            //step three - create token if passwords are a match
            const newJWT = this.createToken({email:user.email,id:user.id});

            return newJWT


        } catch (error) {
            console.log('something went wrong while sign-in ,from user-service layer :' + error);
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const verifiedUser = this.verifyToken(token);

            if(!verifiedUser){
                throw {error:'Invalid token'}
            }
            const user = await this.userRepository.getById(verifiedUser.id);
            if(!user){
                throw {error:'No user with corresponding token exists'}
            }
             return user.id
        } catch (error) {
            console.log('something went wrong while token verification from user-service layer');
            throw error;
        }
    }
      createToken(user){
        try {
          const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'})

           return result  
        } catch (error) {
            console.log('something went wrong while token creation from user-service layer');
            throw error;
        }
      }

      verifyToken(token){
        try {
            const verified = jwt.verify(token,JWT_KEY);
            return verified;
            
        } catch (error) {
            console.log('something went wrong while token validation from user-service layer :' + error);
            throw error;
        }
      }
    
       checkPassword(userInputPlainPassword,encryptedPassword){
        try {
       return bcrypt.compareSync(userInputPlainPassword,encryptedPassword)               
 
        } catch (error) {
            console.log('something went wrong while password verification from user-service layer :' + error);
            throw error;
        }
      }

  
}




module.exports=UserService