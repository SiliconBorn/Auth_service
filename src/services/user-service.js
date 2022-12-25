const UserRepository =require("../repository/user-repository")
const {JWT_KEY} = require("../config/serverConfig")
const jwt = require("jsonwebtoken")



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
            console.log('error from user-service layer');
            throw error;
        }
      }

      verifyToken(token){
        try {
            const verified = jwt.verify(token,JWT_KEY);
            return verified;
            
        } catch (error) {
            console.log('error from user-service layer :' + error);
            throw error;
        }
      }
    
}




module.exports=UserService