const express= require('express');

const { BoxCricketController }=require('../../controllers');
const { BoxCricketMiddlewares }=require('../../middlewares');

const router=express.Router();

router.post('/',BoxCricketMiddlewares.validateCreateRequest,BoxCricketController.createBoxCricket);
router.get('/:id',BoxCricketController.getBoxCricket);
router.get('/',BoxCricketController.getAllBoxCricketGroundsByFilters);
router.get('/getAllGrounds',BoxCricketController.getAllBoxCricketGrounds);
router.patch('/:id',BoxCricketController.updateBoxCricket);
router.delete('/:id',BoxCricketController.destroyBoxCricket);
module.exports=router;