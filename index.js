// Build a web server on port 3000
const mongoose = require('mongoose');
const morgan =require('morgan');
const debug =require('debug');
const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers =require('./routes/customers');
const movies =require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const home = require('./routes/home');

mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(()=> console.log('Connected Vidly databae'))
    .catch(err=> console.error('Could not connet to Vidly Database'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users);
app.use('/', home);

const port=3000;

app.set('view engine','pug');
app.set('views','./views');//default path

//console.log(app.get('tiny'));


/*/Morgon error log 
if (app.get('env')==='development'){
    app.use(morgan('dev'));
    debug ('morgan enabled...');
}
*/



//Listen to port
app.listen(port, ()=>{
    console.log('Listinig... port 3000');
    });
