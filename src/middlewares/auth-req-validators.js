
const validateUserAuth = (req,res,next)=>{

 if(!req.body.email || !req.body.password){
   return res.status(400).json({
    message:"Both email and password is required ",
    success:false,
    data:{},
    err:'Missing data from user inputs'

   })
 }

 next();

}


const  validateIsAdminReq=(req,res,next)=>{

  if(!req.body.id){
    return res.status(400).json({
      message:"User ID is required ",
      success:false,
      data:{},
      err:'Missing data from user inputs'
  
     })
  }

  next()
}











module.exports={
    validateUserAuth,
    validateIsAdminReq
}