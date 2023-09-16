const { StatusCodes }=require('http-status-codes');

const {ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='Something went wrong while creating a new city ';
        ErrorResponse.error= new AppError(['city name not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.stateId){
        ErrorResponse.message='Something went wrong while creating a new city ';
        ErrorResponse.error= new AppError(['stateId not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    next();  //controller is the next middleware
};

module.exports={
    validateCreateRequest
}