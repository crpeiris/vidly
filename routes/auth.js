
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _lodash =require('lodash');
const {User}= require ('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router =  express.Router();


router.post('/',async (req,res)=>{
    const {error}= validateUserPass(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or Password');

    //_lodash is a tool to pick only selected fields from an object 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Username or Password');

        //Generate a jsonwebtoken with payload
    const token= jwt.sign({_id: user._id}, 'jwtPrivetKey');

    res.send(token);

});

function validateUserPass(user) {
    const schema = Joi.object ({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);  
}

module.exports =router;
