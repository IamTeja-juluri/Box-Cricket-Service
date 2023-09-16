const express= require('express');

const { AreaController }=require('../../controllers');
const { AreaMiddlewares }=require('../../middlewares');

const router=express.Router();

router.post('/',AreaMiddlewares.validateCreateRequest,AreaController.createArea);
router.get('/:id',AreaController.getArea);
router.get('/',AreaController.getAllAreas);
router.patch('/:id',AreaController.updateArea);
router.delete('/:id',AreaController.destroyArea);



module.exports=router;