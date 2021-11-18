const express = require('express')
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const router = express.Router()





router.post('/register', async(req, res) => {

    const uniqueId = uuidv4();
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const createdUser = await User.create({id: uniqueId,name: req.body.name, password: req.body.password ,phone: req.body.phone, email: req.body.email}).then((result) =>{
        res.send(JSON.stringify({succes: true, body: result}))
    }).catch((err)=>{
        res.send(JSON.stringify({succes: false, body: err}))
    })

});

router.post('/login', async(req, res) => {
   const returnedUser = await User.findOne({where:{
        email: req.body.email,
    }})


    if(returnedUser){
        const verify = await bcrypt.compare(req.body.password,returnedUser.password)
        if(verify){
        res.send(returnedUser)
         }else{
        res.send(JSON.stringify({succes: false, body: { name: 'PasswordNotValid'}}))
        }
    }else{
        res.send(JSON.stringify({succes: false, body: { name: 'MailNotExist'}}))
    }

})

router.get('/all',async(req,res)=>{
    User.findAll().then(users => res.send(users))
    
})


module.exports = router;