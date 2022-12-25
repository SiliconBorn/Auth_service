const UserService = require('../services/user-service')

const userService = new UserService()

const create = async(req,res)=>{

    try {
        const user = await userService.create({
            email:req.body.email,
            password:req.body.password,
        })

        return res.status(201).json({
            data:user,
            message:"successfully registered new user",
            err:{},
            success:true
        })
    } catch (error) {
        console.log('error from user-controller layer');
            
        return res.status(500).json({
            data:{},
            message:"unable to register user",
            err:error,
            success:false
        })
    }

    
}

const sigIn = async(req,res)=>{
        try {
            
            const response = await userService.signIn(req.body.email,req.body.password)
        

            return res.status(200).json({
                data:response,
                message:"successfully signed in user",
                err:{},
                success:true
            })
        } catch (error) {
            console.log('error from user-controller layer');
            
            return res.status(500).json({
                data:{},
                message:"unable to login user",
                err:error,
                success:false
            })  
        }
}

const isAuthenticated =async(req,res)=>{

    try {
     const token = req.headers['x-access-token']
     const response = await userService.isAuthenticated(token);

     return res.status(200).json({
        message:'user authenticated with valid token',
        success:true,
        err:{},
        data:response
     })

    } catch (error) {
        console.log('error from user-controller layer');
            
            return res.status(500).json({
                data:{},
                message:"something went wrong",
                err:error,
                success:false
            })  
    }
}

module.exports={
    create,
    sigIn,
    isAuthenticated
}