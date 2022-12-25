const express = require("express")
const db = require('./models/index')
const {User,Role} = require('./models/index')
const {PORT} =require('./config/serverConfig')
const apiRoutes = require('./routes/index')
const bodyParser = require('body-parser')

const app = express()

const prepareAndStartServer=()=>{

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
  app.use('/api',apiRoutes);

    app.listen(PORT,async()=>{
      
      if(process.env.DB_SYNC){
       db.sequelize.sync({alter:true})
      }

      // const u1 = await User.findByPk(3);
      // const r1 = await Role.findByPk(2);
      // // u1.addRole(r1);
      // const response  =  await r1.getUsers()
      // console.log(response)
        console.log(`server started at PORT: ${PORT}`)
    })
}

prepareAndStartServer()