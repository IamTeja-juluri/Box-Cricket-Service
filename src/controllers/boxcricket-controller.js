const {StatusCodes}=require('http-status-codes');
const { BoxCricketService }=require('../services');

const {SuccessResponse,ErrorResponse}=require('../utils/common')


async function createBoxCricket(req,res){

    try{
        console.log(req.body);
        const boxcricket= await BoxCricketService.createBoxCricket({
            name:req.body.name,
            areaId:req.body.areaId,
            location:req.body.location,
            price:req.body.price,
            size:req.body.size,
            is24hrsOpen:req.body.is24hrsOpen,
            ownerContact:req.body.ownerContact,
            ownerName:req.body.ownerName,
            photo: req.body.photo
       });
       SuccessResponse.data=boxcricket;
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


async function getBoxCricket(req,res){
    try{
        const boxcricket=await BoxCricketService.getBoxCricket(req.params.id);
        SuccessResponse.data=boxcricket;
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

async function getAllBoxCricketGroundsByFilters(req,res){
    try{
        console.log(req.query);
       const boxCricketGrounds= await BoxCricketService.getAllBoxCricketGroundsByFilters(req.query);
       SuccessResponse.data=boxCricketGrounds;
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


async function getAllBoxCricketGrounds(req,res){
    try{
        const response=await BoxCricketService.getAllBoxCricketGrounds();
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


async function updateBoxCricket(req,res){
    try{
        const box=await BoxCricketService.updateBoxCricket(req.params.id,{name:req.body.name});
        SuccessResponse.data=box;
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

async function destroyBoxCricket(req,res){
    try{
        const response=await BoxCricketService.destroyBoxCricket(req.params.id);
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


module.exports={createBoxCricket,getBoxCricket,getAllBoxCricketGroundsByFilters,getAllBoxCricketGrounds,updateBoxCricket,destroyBoxCricket}