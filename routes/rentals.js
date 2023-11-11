const auth =  require('../middleware/auth');
const { Rental, validateRental } = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//const Fawn = require('fawn');
//Fawn.init('mongodb://127.0.0.1/vidly');

router.get('/', async (req,res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
});

router.post('/', auth , async (req,res)=>{
    const {error} = validateRental(res.body);
        if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
        if(!customer) return (res.status(400).send('The given customer id is not valid'));

    const movie = await Movie.findById(req.body.movieId);
        if(!movie) return res.status(400).send('The given movie is not valid');
        if(movie.numberInStock===0) return (res.status(400).send('The movie out of stock'));
            
    let rental =  new Rental( {
        customer: {
            _id : customer._id,
            name: customer.name,
            phone: customer.phone  
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },       
    });
    /*  These all operations should be run or revert, use Fawn for that
     new Fawn.Task()
        .save('rentals',rental)
        .update('movies', {_id: movie._id}, {$inc: {numberInStock: -1}})
        .run();
        req.send(rental);
    */

    try{
        movie.numberInStock--;
        movie.save();
        rental = await rental.save();

        res.send(rental);

        }
    catch (ex){
        res.status(500).send(ex);
        console.log(ex);
     }
    
});

router.get('/:id',async (req,res)=>{
    const rental=  await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send('The rental with the given ID was not found.');
    
    res.send(rental);
});


module.exports = router;