const Joi =require ('joi');
const mongoose =require('mongoose');


const genreSchema = new mongoose.Schema({
    name :{ 
        type: String,
        required: true,
        minlength:5,
        maxlength: 50
    }
 });

 //This is new in this version, now GenreSchema is seprate and can be reused 
 const Genre = mongoose.model('Genre', genreSchema);


 //functions for Genre validation
function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
};

exports.genreSchema =genreSchema;
exports.Genre = Genre;
exports.validateGenre = validateGenre;
