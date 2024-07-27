import Controllers from './class.controller.js';
import UserService from '../service/user.services.js';
import { createResponse } from '../utils.js';

const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }
  registerResponse = (req, res, next) => {
    try {
      res.json({
        msg: 'Register OK',
        session: req.session
      })
    } catch (error) {
      next(error);
    }
  };

  
  register = async(req, res, next) =>{
    try {
      const data = await this.service.register(req.body);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };
  
  loginResponse = async (req, res, next) => {
    //req.session.passport.user
    try {
      let id = null;
      if(req.session.passport && req.session.passport.user) id = req.session.passport.user;
      const user = await services.getUserById(id);
      if(!user) res.status(401).json({ msg: 'Error de autenticacion' });
      const { first_name, last_name, email, age, role } = user;
      res.redirect('/profile')
    } catch (error) {
      next(error);
    }
  };
  
  githubResponse = async(req, res, next) => {
    try {
      // console.log(req.user);
      const { first_name, last_name, email, role } = req.user;
      res.json({
        msg: 'LOGIN CON GITHUB OK!',
        user: {
          first_name,
          last_name,
          email,
          role
        }
      })
      } catch (error) {
      next(error)
    }
  }
  
  googleResponse = async(req, res, next) => {
    try {
      // console.log(req.user);
      const { first_name, last_name, email, role } = req.user;
      res.json({
        msg: 'LOGIN CON GOOGLE OK!',
        user: {
          first_name,
          last_name,
          email,
          role
        }
      })
      } catch (error) {
      next(error)
    }
  }
  
  logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: 'Error al cerrar sesión' });
      }
      res.redirect('/login');
    });

  }

  profile = async(req, res, next)=>{
    try {
     if(req.user){
      const { _id } = req.user;
      const user = await this.service.getUserById(_id);
      createResponse(res, 200, user)
     } else createResponse(res, 401, { msg: 'Unhautorized' })
    } catch (error) {
      next(error);
    }
  }
};
