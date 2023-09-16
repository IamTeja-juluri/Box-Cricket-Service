const { StatusCodes }=require('http-status-codes');

const {ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='Something went wrong while creating a boxcricket ground';
        ErrorResponse.error= new AppError(['Boxcricket ground name not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.areaId){
        ErrorResponse.message='Something went wrong while creating a boxcricket ground';
        ErrorResponse.error= new AppError(['Boxcricket area id not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.location){
        ErrorResponse.message='Something went wrong while creating a boxcricket ground';
        ErrorResponse.error= new AppError(['Boxcricket area not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message='Something went wrong while creating a boxcricket ground';
        ErrorResponse.error= new AppError(['Boxcricket ground price not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.size){
        ErrorResponse.message='Something went wrong while creating a boxcricket ground';
        ErrorResponse.error= new AppError(['Boxcricket ground size not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.is24hrsOpen){
        ErrorResponse.message='Something went wrong while creating a boxcricket ground';
        ErrorResponse.error= new AppError(['Boxcricket ground 24hrs status not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.ownerContact){
        ErrorResponse.message='Something went wrong while creating a boxcricket ground';
        ErrorResponse.error= new AppError(['Boxcricket owner contact not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.ownerName){
        ErrorResponse.message='Something went wrong while creating a boxcricket ground';
        ErrorResponse.error= new AppError(['Boxcricket owner name not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    next();  //controller is the next middleware
};

module.exports={
    validateCreateRequest
}