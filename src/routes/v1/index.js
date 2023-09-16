const express= require('express');

const { InfoController}=require('../../controllers')

const stateRoutes= require('./state-routes')
const cityRoutes= require('./city-routes')
const areaRoutes= require('./area-routes')
const boxCricketRoutes = require('./boxcricket-routes')

const router=express.Router();

router.get('/info',InfoController.info)

router.use('/state',stateRoutes)
router.use('/city',cityRoutes)
router.use('/area',areaRoutes)
router.use('/boxcricket',boxCricketRoutes)



module.exports=router