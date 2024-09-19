import Controllers from './class.controller.js';
import UserService from '../service/user.services.js';
import { createResponse } from '../utils.js';
import httpResponse from '../utils/httpresponse.js';
import {logger} from "../logs/logger.js";
import { sendMail } from '../service/mailling.services.js';

const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService)
  }

  register = async (req, res, next) => {
    try {
      const data = await this.service.register(req.body);
      !data ? httpResponse.MissingData(res, data) : httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      res.cookie('token', token, { httpOnly: true });
      !token ? httpResponse.NotFound(res, data) : httpResponse.Ok(res, token);
      logger.info(`el token es ${token}`);
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      if (req.user) {
        const { _id } = req.user;
        const user = await this.service.getUserById(_id);
        const { first_name, last_name, email, age, cart, role } = user;
        res.json({
          msg: 'Login ok',
          user: {
            first_name,
            last_name,
            email,
            age,
            cart,
            role
          }
        })
      } else return httpResponse.Unauthorized(res, data);
    } catch (error) {
      next(error);
    }

  }
  generateResetPass = async(req, res, next) => {
    try {
      const user = req.user;
      const token = await userService.generateResetPass(user);
      if(token){
        await sendMail(user, 'resetPass', token);
        res.cookie('tokenpass', token);
        createResponse(res, 200, 'Email reset pass send OK')
      } else createResponse(res, 404, 'error email reset pass send')
    } catch (error) {
      next(error)
    }
  }

  async updatePass(req, res,next){
    try {
      const user = req.user;
      const { pass } = req.body;
      const { tokenpass } = req.cookies;
      if(!tokenpass) return createResponse(res, 401, 'Unhautorized');
      const updPass = await userService.updatePass(pass, user);
      if(!updPass) return createResponse(res, 404, 'cannot be the same')
      res.clearCookie('tokenpass');
      return createResponse(res, 200, updPass);
    } catch (error) {
      next(error)
    }
  }

  async changeUserRole(req, res) {
    try {
      const { userId, newRole } = req.body;

      const currentUser = req.user;
      if (currentUser.role !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      if (!['user', 'premium'].includes(newRole)) {
        return res.status(400).json({ message: 'Rol no válido' });
      }

      const user = await userService.getById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      user.role = newRole;
      await user.save(); 

      res.status(200).json({ message: 'Rol actualizado correctamente', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el rol' });
    }
  }

  checkUsersLastConnection = async (req, res, next) => {
    try {
      const response = await this.service.checkUsersLastConnection();
      return createResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      const user = req.user;  
      if (!user) return httpResponse.Unauthorized(res, "No user logged in");

      await this.service.logout(user._id);
      res.clearCookie('token');  
      return httpResponse.Ok(res, { message: 'Logout successful' });
    } catch (error) {
      next(error);
    }
  };

};
