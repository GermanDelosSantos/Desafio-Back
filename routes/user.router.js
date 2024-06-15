import { Router } from 'express';
import passport from 'passport';
import { isAuth } from "../midlewares/isAuth.js";

import {
    registerResponse,
    loginResponse,
  } from "../controllers/user.controllers.js";
  
  const router = Router();
  
  router.post("/register", passport.authenticate('register'), registerResponse);
  
  router.post("/login", passport.authenticate('login'), loginResponse);
  
  router.get('/private', isAuth, (req, res)=>res.json({ msg: 'Ruta PRIVADA' }))

export default router;