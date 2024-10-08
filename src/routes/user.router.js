import { Router } from 'express';
import passport from 'passport';
import { isAuth } from "../midlewares/isAuth.js";
import UserController from '../controllers/user.controllers.js';
import { checkAuth } from '../midlewares/checkJwt.js';
import { checkAdmin } from '../midlewares/checkAdmin.js';
import { logger } from '../logs/logger.js'
const controllers = new UserController();

  
  const router = Router();
  router.post('/register', controllers.register);

  router.get('/getall', [checkAuth, checkAdmin] , controllers.getAll);

  router.post('/login', controllers.login);
  
  router.get("/current", checkAuth, controllers.profile);

  router.put('/new-password', checkAuth, controllers.updatePass);

  router.get('/', [checkAuth, checkAdmin], controllers.checkUsersLastConnection);

  router.get('/private', isAuth, (req, res)=>res.json({ msg: 'Ruta PRIVADA' }));


  router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }))  

  router.get('/profile-github', passport.authenticate( 'github' , {
      failureRedirect: '/login', 
      successRedirect: '/profile', 
      passReqToCallback: true
  }));

  router.get('/logger-test', checkAuth, async (req, res) => {
    try {
      logger.silly('logger silly')
      logger.debug('logger debug')
      logger.info('logger info')
      logger.warn('logger warn')
      logger.error('logger error')
    } catch (error) {
      res.status(500).json({ message: error.message})      
    }
  })

  router.post('/resset-pass', checkAuth, controllers.generateResetPass)

  router.put('/change-role',checkAuth, controllers.changeUserRole);

  router.delete('/inactive', [checkAuth, checkAdmin], controllers.deleteInactiveUsers);
  
  router.post('/logout',checkAuth, controllers.logout);


export default router;