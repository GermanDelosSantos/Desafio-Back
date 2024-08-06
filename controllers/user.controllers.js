import Controllers from './class.controller.js';
import UserService from '../service/user.services.js';
import { createResponse } from '../utils.js';
import httpResponse from '../utils/httpresponse.js';

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
      console.log(`el token es ${token}`);
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
};
