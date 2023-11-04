const bcrypt = require('bcrypt');
const _lodash =require('lodash');
const {User, validateUser}= require ('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router =  express.Router();


router.post('/',async (req,res)=>{
    const {error}= validateUser(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registred');


    //_lodash is a tool to pick only selected fields from an object
    user = new User (_lodash.pick(req.body,['name','email','password']));
    
    const salt =await bcrypt.genSalt(10);
    user.password = await bcrypt.hash( user.password,salt);
    
    await user.save();
    res.send(_lodash.pick(user,['_id'],'name','email'));
});

module.exports =router;
