const express= require('express');

const { StateController }=require('../../controllers');
const { StateMiddlewares }=require('../../middlewares');

const router=express.Router();

router.post('/',StateMiddlewares.validateCreateRequest,StateController.createState);
router.get('/:id',StateController.getState);
router.get('/',StateController.getAllStates);
router.patch('/:id',StateController.updateState);
router.delete('/:id',StateController.destroyState);


module.exports=router;