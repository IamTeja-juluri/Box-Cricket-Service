const {StatusCodes}=require('http-status-codes');
const {Op}=require('sequelize');
const {BoxCricketRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');


const boxCricketRepository=new BoxCricketRepository();


async function createBoxCricket(data){
 
    try{
        const boxcricket= await boxCricketRepository.create(data);
        return boxcricket;
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
        throw new AppError('Cannot create a new boxcricket Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getBoxCricket(id){
    try{
        const boxcricket=await boxCricketRepository.get(id);
        return boxcricket;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The boxcricket you requested is not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of the boxcricketground',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAllBoxCricketGrounds(){
    try{
        const grounds=await boxCricketRepository.getAll();
        console.log(grounds);
        return grounds;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The grounds you requested are not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of all grounds',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateBoxCricket(id,data){
    try{
        const response=await boxCricketRepository.update(id,data);
        return response;
    }
    catch(error){
        if(error.statusCode ===  StatusCodes.NOT_FOUND){
            throw new AppError("The Box you requested to update is not present",error.statusCode)
        }
        throw new AppError('Cannot update a box',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyBoxCricket(id){
    try{
        const response=await boxCricketRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode ===  StatusCodes.NOT_FOUND){
            throw new AppError("The box you requested to delete is not present",error.statusCode)
        }
        throw new AppError('Cannot delete a box',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



async function getAllBoxCricketGroundsByFilters(query){

    let customFilter={}
    let sortFilter=[]


    if(query.price){
        [minPrice,maxPrice]=query.price.split('-');
        customFilter.price={
            [Op.between] : [minPrice,((maxPrice == undefined) ? 2000: maxPrice)]
        }
    }

    if(query.sort){
        const params=query.sort.split(',');
        const sortFilters=params.map((param)=>param.split('_'));
        sortFilter=sortFilters
    }

    try{
        console.log('customFilter=',customFilter)
        const boxCricketGrounds=boxCricketRepository.getAllBoxCricketGroundsByFilters(query);
        return boxCricketGrounds;
    }catch(error){
        throw new AppError('Cannot fetch data of all flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}



module.exports={
   createBoxCricket,getBoxCricket,getAllBoxCricketGrounds,destroyBoxCricket,updateBoxCricket,getAllBoxCricketGroundsByFilters
}