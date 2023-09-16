const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

function connectToDatabase(){
    // Define the JSON configuration file path
    const configFilePath= './src/config/config.json';
    // Define the target environment 
    const targetEnvironment = 'development';
    // Read the existing JSON configuration
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));  
    // Update the configuration object with values from .env for the target environment
    if (targetEnvironment in config) {
        config[targetEnvironment].host = process.env.DB_HOST || config[targetEnvironment].host;
        config[targetEnvironment].username = process.env.DB_USER || config[targetEnvironment].username;
        config[targetEnvironment].password = process.env.DB_PASSWORD || config[targetEnvironment].password;
        config[targetEnvironment].database = process.env.DB_NAME || config[targetEnvironment].database;
    } else {
        console.error(`Environment '${targetEnvironment}' not found in config.json.`);
        process.exit(1);
    }
    // Write the updated configuration back to the JSON file
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}

module.exports=connectToDatabase;