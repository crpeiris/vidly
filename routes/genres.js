const Joi =require ('joi');
const auth =  require('../middleware/auth');
const admin =  require('../middleware/admin');
const { Genre , validateGenre } = require ('../models/genre');
const mongoose = require('mongoose');
const express =require('express');
const { MongoDB } = require('winston/lib/winston/transports');
const router = express.Router();

 router.get('/', async (req,res)=>{
    //throw new error('Could not get Genres..');
    const genres = await  Genre.find().sort('name');
    res.send(genres);
    // short await res.send(Genre.find());
});

//Creating a Genre
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    
    res.send(genre);
  });

//Update Genre Old error if id not correct
router.put('/:id' ,   async (req,res)=>{
    //Validate Genre name
    const {error} = validateGenre(req.body);
        if (error) return res.status(404).send(result.error.details[0].message);
    
        //Search Genre matching id
     const genre = await Genre.findByIdAndUpdate(req.params.id,{ name:req.body.name },{ new: true });
        res.send(genre);
    
        if(!genre) return res.status(404).send('The Genre with given ID not found');
});

//Delete a Genre
router.delete('/:id', [auth, admin]   , async (req,res)=>{
   //Search Genre matching id
   const genre = await Genre.findByIdAndRemove(req.params.id);
   if (!genre) {
        res.status(404).send('The Genre with given ID not found');
        return;
   };
   res.send(genre);

});

router.get('/:id', auth, async (req, res) => {
    
    const result = validateObjectId(req.params.id);
    if (!result) return res.status(400).send('The  given ID not valid');
    
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(400).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });


//function for object id  validation using Joi Schema
function validateId(obid){
    const schema = Joi.object({
        id: Joi.string().length(24).required()
    });
    return schema.validate({id: obid}); 
};

// functions for object id  validation using Typeof MongoDB
function validateObjectId(givenId){
    let ObjectId =   require('mongodb').ObjectId;
    return ObjectId.isValid(givenId);
};


module.exports = router;