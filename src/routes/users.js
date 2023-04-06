const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const passport = require('passport');

router.get('/users/signin', (req,res)=>{
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local',{
   successRedirect: '/notes',
   failureRedirect: '/users/signin',
   failureFlash: true
}));

router.get('/users/signup', (req,res)=>{
    res.render('users/signup');
});


router.post('/users/signup', async (req,res)=>{
 const {name, email, password, confirm_password} = req.body;
 const errors=[];
 if(name.length<=0){
    errors.push({text: 'Por favor inserte un nombre'});
 }
 if(email.length<=0){
    errors.push({text: 'Por favor inserte un email'});
 }
 if(password.length<=0){
    errors.push({text: 'Por favor inserte una contraseña'});
 }
 if(confirm_password.length<=0){
    errors.push({text: 'Por favor confirme la contraseña'});
 }
 if(password!=confirm_password){
    errors.push({text: 'Las contraseñas no coinciden'})
 }
 if(password.length<4 && password.length>0){
    errors.push({text: 'La contraseña contener mas de 4 caracteres'})
 }
 if(errors.length>0){
    res.render('users/signup', {errors, name, email, password, confirm_password});
 }
 else{
   const emailUser = await User.findOne({email: email});
   if(emailUser){
      errors.push({text: 'Este email ya esta registrado'});
      res.render('users/signup', {errors, name, email, password, confirm_password});
   }
   else{
      const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Registro realizado con exito!');
    res.redirect('/users/signin');
   }    
}});

router.get('/users/logout', (req,res)=>{
   req.logout(function(err){
      if (err) { return next(err);}
   });
   res.redirect('/');
})

module.exports = router;