const {StatusCodes}=require('http-status-codes');
const { AreaService }=require('../services');

const {SuccessResponse,ErrorResponse}=require('../utils/common')


async function createArea(req,res){

    try{
        console.log(req.body);
        const area= await AreaService.createArea({
            name:req.body.name,
            cityId:req.body.cityId
       });
       SuccessResponse.data=area;
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


async function getArea(req,res){
    try{
        const area=await AreaService.getArea(req.params.id);
        SuccessResponse.data=area;
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


async function getAllAreas(req,res){
    try{
        const response=await AreaService.getAllAreas();
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


async function updateArea(req,res){
    try{
        const area=await AreaService.updateArea(req.params.id,{name:req.body.name});
        SuccessResponse.data=area;
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

async function destroyArea(req,res){
    try{
        const response=await AreaService.destroyArea(req.params.id);
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




module.exports={createArea,getArea,getAllAreas,updateArea,destroyArea}