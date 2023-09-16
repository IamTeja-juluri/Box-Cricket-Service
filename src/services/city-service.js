const {StatusCodes}=require('http-status-codes');
const {Op}=require('sequelize');
const { CityRepository }=require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();


async function createCity(data){
 
    try{
        const city= await cityRepository.create(data);
        return city;
    }
    catch(error){
        console.log("Got error",error);
        if(error.name == 'SequelizeValidationError'){
            let explanation=[];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log("explantion=",explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getCity(id){
    try{
        const city=await cityRepository.get(id);
        return city;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The area you requested is not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of the city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAllCities(){
    try{
        const cities=await cityRepository.getAll();
        return cities;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The cities you requested are not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of all cities',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try{
        const response=await cityRepository.update(id,data);
        return response;
    }
    catch(error){
        if(error.statusCode ===  StatusCodes.NOT_FOUND){
            throw new AppError("The city you requested to update is not present",error.statusCode)
        }
        throw new AppError('Cannot update a city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try{
        const response=await cityRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode ===  StatusCodes.NOT_FOUND){
            throw new AppError("The city you requested to delete is not present",error.statusCode)
        }
        throw new AppError('Cannot delete a city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
  createCity,getCity,getAllCities,updateCity,destroyCity
}