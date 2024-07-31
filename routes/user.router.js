import { Router } from 'express';
import passport from 'passport';
import { isAuth } from "../midlewares/isAuth.js";
import UserController from '../controllers/user.controllers.js';
import { checkAuth } from '../midlewares/checkJwt.js';

const controllers = new UserController();

  
  const router = Router();
  router.post('/register', controllers.register);

  router.get('/getall', controllers.getAll);

  router.post('/login', controllers.login);
  
  router.get("/current", checkAuth, (req, res) => {
    const user = req.user.toObject();
    res.render("profile", { user });
  });

  router.get('/private', isAuth, (req, res)=>res.json({ msg: 'Ruta PRIVADA' }));


  router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }))  

  router.get('/profile-github', passport.authenticate( 'github' , {
      failureRedirect: '/login', 
      successRedirect: '/profile', 
      passReqToCallback: true
  }));
  
  // router.post('/logout', controllers.logout);

export default router;