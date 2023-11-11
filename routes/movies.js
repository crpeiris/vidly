const auth =  require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Movie, validateMovie} = require('../models/movie');
const {Genre} = require('../models/genre');

router.get('/',  async (req,res)=>{
    const movies = await Movie.find().sort();
    res.send(movies);
});

router.post('/', auth , async (req,res)=>  {
    console.log ('checkpoit movies post 1');
    //validate the request body (user input) using Joi schema 
    const {error} = validateMovie(req.body);
        if (error) return res.status(400).send(error.details[0].message);

    //Check is Genreid valid finding a matching genre
    const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(400).res('Invalid Genre');

    let movie = new Movie({
        title: req.body.title,
        //also possible "genre: genre", then exact genre will create with all fields
        genre: {
                _id: genre._id,
                name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie= await movie.save();

    res.send(movie);
});

router.put('/:id',  auth ,  async (req,res)=>{
    //validate the request body (user input) using Joi schema 
    const {error} = validateMovie(req.body);
        if (error) return res.status(400).send(error.details[0].message);
                
    //Check is Genreid valid finding a matching genre
    const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(400).send('Invalid Genre');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {        
            title: req.body.title,
            genre: {
              _id: genre._id,
              name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
    }, { new: true } );

    if(!movie) return res.status(404).send('The movie with the given ID was not found.');
    return res.send(movie);

});

router.delete('/:id', auth , async (req, res)=> {

    const movie= await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('The movie with the given ID was not found.')
    res.send(movie);

});

router.get('/:id',async (req,res)=>{
    const movie= await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
});

module.exports = router;