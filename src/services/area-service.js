const {StatusCodes}=require('http-status-codes');
const {Op}=require('sequelize');
const {AreaRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');

const areaRepository = new AreaRepository();


async function createArea(data){
 
    try{
        const area= await areaRepository.create(data);
        return area;
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
        throw new AppError('Cannot create a new area Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getArea(id){
    try{
        const area=await areaRepository.get(id);
        return area;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The area you requested is not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of the area',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAllAreas(){
    try{
        const areas=await areaRepository.getAll();
        return areas;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The areas you requested are not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of all areas',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateArea(id,data){
    try{
        const response=await areaRepository.update(id,data);
        return response;
    }
    catch(error){
        if(error.statusCode ===  StatusCodes.NOT_FOUND){
            throw new AppError("The Area you requested to update is not present",error.statusCode)
        }
        throw new AppError('Cannot update an area',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyArea(id){
    try{
        const response=await areaRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode ===  StatusCodes.NOT_FOUND){
            throw new AppError("The Area you requested to delete is not present",error.statusCode)
        }
        throw new AppError('Cannot delete a area',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
   createArea,getArea,getAllAreas,updateArea,destroyArea
}