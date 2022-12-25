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