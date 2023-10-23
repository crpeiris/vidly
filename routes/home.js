const express= require ('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index',{title:'Vidly Express Home', message:'Welcome Vidly Video Shop'});
});

module.exports= router;