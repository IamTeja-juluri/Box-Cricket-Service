const {StatusCodes}=require('http-status-codes');
const { StateService }=require('../services');

const {SuccessResponse,ErrorResponse}=require('../utils/common')


async function createState(req,res){

    try{
        console.log(req.body);
        const state= await StateService.createState({
            name:req.body.name
       });
       SuccessResponse.data=state;
       return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error=error;
        return res.
              status(error.statusCode)
              .json(ErrorResponse);  
    }
    
}


async function getState(req,res){
    try{
        const state=await StateService.getState(req.params.id);
        SuccessResponse.data=state;
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }
}

async function getAllStates(req,res){
    try{
        const response=await StateService.getAllStates();
        SuccessResponse.data=response;
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error=error;
        return res.
              status(error.statusCode)
              .json(ErrorResponse);  
    }
}


async function updateState(req,res){
    try{
        const state=await StateService.updateState(req.params.id,{name:req.body.name});
        SuccessResponse.data=state;
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }
}

async function destroyState(req,res){
    try{
        const response=await StateService.destroyState(req.params.id);
        SuccessResponse.data=response;
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error=error;
        return res.
              status(error.statusCode)
              .json(ErrorResponse);  
    }
}




module.exports={createState,getState,getAllStates,updateState,destroyState}