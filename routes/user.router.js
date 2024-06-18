import { Router } from 'express';
import passport from 'passport';
import { isAuth } from "../midlewares/isAuth.js";

import {
    registerResponse,
    loginResponse,
    githubResponse,
    logout
  } from "../controllers/user.controllers.js";
  
  const router = Router();
  
  router.post("/register", passport.authenticate('register'), registerResponse);
  
  router.post("/login", passport.authenticate('login'), loginResponse);

  router.get('/private', isAuth, (req, res)=>res.json({ msg: 'Ruta PRIVADA' }));


  router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }))  

  router.get('/profile', passport.authenticate( 'github' , {
      failureRedirect: '/login', 
      successRedirect: '/profile-github', 
      passReqToCallback: true
  }));
  
  router.post('/logout', logout);

export default router;