const express = require("express");
const app = express();

const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const {PORT} =require("./config/serverConfig");

// const db = require("./models/index");




const prepareAndStartServer = () =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,async()=>{
        console.log(`Server Started on PORT ${PORT}`);
        // if(process.env.DB_SYNC){
        //     db.sequelize.sync({alter :true});
        // }
        
    })
}
prepareAndStartServer();