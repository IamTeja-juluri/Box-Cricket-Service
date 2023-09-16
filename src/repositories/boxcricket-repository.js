const CrudRepository= require('./crud-repository');
const {Sequelize,Op}=require('sequelize');
const { BoxCricket,Area,City,State}=require('../models');

class BoxCricketRepository extends CrudRepository{
    
    constructor(){
       super(BoxCricket);
    }
   
    async getAllBoxCricketGroundsByFilters(query){
        
        const conditions = [
            query.is24hrsOpen !== undefined ? { is24hrsOpen: query.is24hrsOpen } : {},
            query.boxCricketName ? { name: query.boxCricketName } : {},
            query.size && query.is24hrsOpen ? { size: query.size, is24hrsOpen: query.is24hrsOpen } : {},
            query.size ? { size: query.size } : {}
        ].filter(Boolean);

        let whereCondition;

         if (conditions.length > 0) {
            whereCondition = conditions
        } 


        // if (conditions.length > 0) {
        //     whereCondition = {
        //         [Op.or]: conditions,
        //     }
        // } 

        const response = await State.findAll({
            where:query.stateName ?{
                name:query.stateName
            }:{},
            include:[{
                model:City,
                where:query.cityName?{
                    name:query.cityName
                }:{},
                required: true,
                include:[{
                    model:Area,
                    where:query.areaName?{
                      name:query.areaName
                    }:{},
                    required:true,
                    include:[{
                        model:BoxCricket,
                        required:true,
                        where: whereCondition
                       }],
                    } ]
                },
        ],
        order: [[City, Area, BoxCricket, 'price', 'DESC']],
        })
        console.log('response=',response);
        return response;
    }

}

module.exports=BoxCricketRepository;