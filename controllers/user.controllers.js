import Controllers from './class.controller.js';
import UserService from '../service/user.services.js';
import { createResponse } from '../utils.js';

const userService = new UserService();

export default class UserController extends Controllers{
  constructor(){
    super(userService)
  }

  register = async(req, res, next) =>{
    try {
      const data = await this.service.register(req.body);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  login = async(req, res, next) =>{
    try {
     const token = await this.service.login(req.body);
      res.cookie('token', token, { httpOnly: true });
     !token ? createResponse(res, 404, token) : createResponse(res, 200, token);
     console.log(`el token es ${token}`);
    } catch (error) {
      next(error);
    }
  };

  profile =async(req, res, next)=>{
    try {
     if(req.user){
      const { _id } = req.user;
      const user = await this.service.getUserById(_id);
      createResponse(res, 200, user)
     } else createResponse(res, 401, { msg: 'Unhautorized' })
    } catch (error) {
      next(error);
    }
  };

};
