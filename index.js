// Build a web server on port 3000
const morgan =require('morgan');
const debug =require('debug');
const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');

app.use(express.json());
app.use('/api/genres',genres);
app.use('/',home);


const port=3000;

app.set('view engine','pug');
app.set('views','./views');//default path

console.log(app.get('tiny'));

if (app.get('env')==='development'){
    app.use(morgan('dev'));
    debug ('morgan enabled...');
}

//Listen to port
app.listen(port, ()=>{
    console.log('Listinig... port 3000');
    });