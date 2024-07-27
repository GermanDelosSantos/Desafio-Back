import { Router } from 'express';
import passport from 'passport';
import { isAuth } from "../midlewares/isAuth.js";
import UserController from '../controllers/user.controllers.js';

const controllers = new UserController();

  
  const router = Router();
  
  router.post("/register", passport.authenticate('register'), controllers.register);
  
  router.post("/login", passport.authenticate('login'), controllers.loginResponse);

  router.get('/private', isAuth, (req, res)=>res.json({ msg: 'Ruta PRIVADA' }));


  router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }))  

  router.get('/profile-github', passport.authenticate( 'github' , {
      failureRedirect: '/login', 
      successRedirect: '/profile', 
      passReqToCallback: true
  }));
  
  router.post('/logout', controllers.logout);

export default router;