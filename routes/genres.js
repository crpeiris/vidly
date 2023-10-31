const mongoose = require('mongoose');

const Joi = require('joi');
const express =require('express');
const router = express.Router();

// Create an array with Gernes (JSON array)


const Genre =  mongoose.model('Genre',new mongoose.Schema({
    name :{ 
        type: String,
        required: true,
        minlength:5,
        maxlength: 50
    }
 }));

 router.get('/',async (req,res)=>{
    const genres = await  Genre.find().sort('name');
    res.send(genres);
    // short await res.send(Genre.find());
});

//Creating a Genre
router.post('/',async (req,res)=>{
   const result = validateGenre(req.body);
   if(result.error){
        res.status(400).send(result.error);
        return;
        };
        let genre = new Genre({name: req.body.name});
        genre = await genre.save();
        res.send(genre);
    });



//Update Genre Old error if id not correct
router.put('/:id', async (req,res)=>{
    //Validate Genre name
    const result = validateGenre(req.body);
        if (result.error) return res.status(404).send(result.error.details[0].message);
    
        //Search Genre matching id
    
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id,{ name:req.body.name },{ new: true });
        res.send(genre);
    } catch (error) {
        res.status(404).send('The Genre with given ID not found');
        return;
    }
});



//Delete a Genre
router.delete('/:id',async (req,res)=>{
   //Search Genre matching id
   const genre = await Genre.findByIdAndRemove(req.params.id);
   if (!genre) {
        res.status(404).send('The Genre with given ID not found');
        return;
   };
   res.send(genre);

});

router.get('/:id',async (req,res)=>{

    const genre = await Genre.findById(req.params.id);
   if (!genre) {
        res.status(404).send('The Genre with given ID not found');
        return;
   };
   res.send(genre);
});

//functions for Genre validation
function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
};

module.exports = router;