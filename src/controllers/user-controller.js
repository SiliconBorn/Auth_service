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


module.exports={
    create
}