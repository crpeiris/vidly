const auth =  require('../middleware/auth');
const admin =  require('../middleware/admin');
const express =require('express');
const router = express.Router();
const { Genre , validateGenre } = require ('../models/genre');

 router.get('/', async (req,res)=>{
    const genres = await  Genre.find().sort('name');
    res.send(genres);
    // short await res.send(Genre.find());
});

//Creating a Genre
router.post('/', auth ,async (req,res)=>{
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
router.put('/:id',auth , async (req,res)=>{
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
router.delete('/:id', [auth, admin]   , async (req,res)=>{
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


module.exports = router;