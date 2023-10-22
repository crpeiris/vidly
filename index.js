// Build a web server on port 3000
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const port=3000;

//Listen to port
app.listen(port, ()=>{
    console.log('Listinig... port 3000');
    });

// Create an array with Gernes (JSON array)
const genres =[
{id:1 , name: 'Action'},
{id:2 , name: 'Horroe'},
{id:3 , name: 'Romance'}
];


app.get('/api/genres',(req,res)=>{
    res.send(genres);
});

//Creating a Genre
app.post('/api/genres',(req,res)=>{

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
app.put('/api/genres/:id',(req,res)=>{

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
app.delete('/api/genres/:id',(req,res)=>{
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

app.get('/api/genres/:id',(req,res)=>{
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







