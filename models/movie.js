const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} =require('./genre');

const movieSchema = new mongoose.Schema ({
    title:{
        type: String,
        required:true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number, 
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number, 
        required: true,
        min: 0,
        max: 255
    }

});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie){
    //This is a joi Scema to validate user input
    const schema = Joi.object ({ 
        title: Joi.string().required().min(5).max(255),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });
    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
