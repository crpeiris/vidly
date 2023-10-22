const Joi = require('joi');
const express =require('express');
const router = express.Router();

// Create an array with Gernes (JSON array)
const genres =[
    {id:1 , name: 'Action'},
    {id:2 , name: 'Horroe'},
    {id:3 , name: 'Romance'},
    {id:4 , name: 'Documentry'}
    ];

router.get('/',(req,res)=>{
    res.send(genres);
});

//Creating a Genre
router.post('/',(req,res)=>{

   const result = validateGenre(req.body);
   if(result.error){
        res.status(400).send(result.error);
        return;
        };
   const genre ={
    id: genres.length+1,
    name: req.body.name
   }
   genres.push(genre);
   res.send(genre);
});

//Update Genre
router.put('/:id',(req,res)=>{

    //Search Genre matching id
    const genre = genres.find(c=>c.id===parseInt(req.params.id));
    if (!genre) {
         res.status(404).send('The Genre with given ID not found');
         return;
    };
    //Validate Genre name
    const result = validateGenre(req.body);
    if (result.error) return res.status(404).send(result.error.details[0].message);
       
    //Assign the new value reding the body
    genre.name = req.body.name;
    res.send(genre);
});


//Delete a Genre
router.delete('/:id',(req,res)=>{
   //Search Genre matching id
   const genre = genres.find(c=>c.id===parseInt(req.params.id));
   if (!genre) {
        res.status(404).send('The Genre with given ID not found');
        return;
   };
   
   const index = genres.indexOf(genre);
   genres.splice(index,1);
   res.send(genre);

});

router.get('/:id',(req,res)=>{
    const genre = genres.find(c=>c.id===parseInt(req.params.id));
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