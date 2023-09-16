const {StatusCodes}=require('http-status-codes');
const {Op}=require('sequelize');
const {StateRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');

const stateRepository = new StateRepository();


async function createState(data){
 
    try{
        const state= await stateRepository.create(data);
        return state;
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
        throw new AppError('Cannot create a new state Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getState(id){
    try{
        const state=await stateRepository.get(id);
        return state;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The state you requested is not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of the state',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllStates(){
    try{
        const states=await stateRepository.getAll();
        return states;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The states you requested are not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of all states',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateState(id,data){
    try{
        const response=await stateRepository.update(id,data);
        return response;
    }
    catch(error){
        if(error.statusCode ===  StatusCodes.NOT_FOUND){
            throw new AppError("The State you requested to update is not present",error.statusCode)
        }
        throw new AppError('Cannot update an state',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyState(id){
    try{
        const response=await stateRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode ===  StatusCodes.NOT_FOUND){
            throw new AppError("The State you requested to delete is not present",error.statusCode)
        }
        throw new AppError('Cannot delete a state',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports={
   createState,getState,getAllStates,updateState,destroyState
}