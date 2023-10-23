// Build a web server on port 3000
const morgan =require('morgan');
const debug =require('debug');
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const genres = require('./routes/genres');
const port=3000;

console.log(app.get('tiny'));

if (app.get('env')==='development'){
    app.use(morgan('dev'));
    debug ('morgan enabled...');
}
app.use('/api/genres',genres);

//Listen to port
app.listen(port, ()=>{
    console.log('Listinig... port 3000');
    });