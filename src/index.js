const express = require('express');
const { ServerConfig,Sequelize }=require('./config');
const retrieveSecrets = require("./config/retrieveSecrets");
const apiRoutes = require('./routes');
const fs = require('fs');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/connectToDatabase')

// Load environment variables from .env
dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',apiRoutes)

// Initialize Sequelize
Sequelize
  .sync()
  .then(() => {
    console.log('Database is connected.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// connectToDatabase();


app.listen(3005, async ()=>{

  try{  
      const secretsString = await retrieveSecrets();
      await fs.writeFile(".env", secretsString); 
      // Define the JSON configuration file path
      console.log(`Successfully started the server on PORT :${3005}`)
  }catch(error){
      console.log("Error in setting environment variables", error);
      process.exit(-1);
    }  
  
});

