const express = require('express')
const UserController = require('../../controllers/user-controller')
const {AuthReqValidator} = require('../../middlewares/index')

const router = express.Router()



router.post('/signup',AuthReqValidator.validateUserAuth,UserController.create);
router.post('/sigin',AuthReqValidator.validateUserAuth,UserController.sigIn)


module.exports=router