const CrudRepository= require('./crud-repository');
const { State }=require('../models');

class StateRepository extends CrudRepository{
    
    constructor(){
       super(State);
    }

}

module.exports=StateRepository;