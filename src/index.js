const express = require('express');
const { ServerConfig }=require('./config');
const mysql = require('mysql2/promise');


const apiRoutes=require('./routes')

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRoutes)

const pool=mysql.createPool({
    host: ServerConfig.DB_HOST,
    port: ServerConfig.DB_PORT,
    user: ServerConfig.DB_USER,
    password: ServerConfig.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/connectionCheck', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        
        const [rows] = await connection.query('SHOW DATABASES');
        
        // connection.release(); // Release the connection after executing the query
        
        // The list of database names is in the 'Database' column of the result rows
        const databaseNames = rows.map(row => row.Database);
        
        console.log('Databases:', databaseNames);

        res.json(databaseNames)  
    } catch (error) {
        console.error('Error listing databases:', error.message);
      }
  });

app.listen(3005, async ()=>{
    
    console.log(`Successfully started the server on PORT :${ServerConfig.PORT}`)
  
});

