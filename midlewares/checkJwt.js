import jwt from 'jsonwebtoken';
import UserService from '../service/user.services.js';
const userService = new UserService();
import 'dotenv/config';
/**
 * Middleware que verifica si el token es válido a través de la cookie 'token'
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const checkAuth = async (req, res, next) => {
    try {
      const token = req.cookies.token
      if (!token) return res.status(401).json({ msg: "Unhautorized" });
      const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
      const user = await userService.getById(decode.userId);
      if (!user) res.status(404).json({ msg: "User not found" });
      //REFRESH TOKEN
      const now = Math.floor(Date.now() / 1000); 
      const tokenExp = decode.exp; 
      const timeUntilExp = tokenExp - now; 
  
      if (timeUntilExp <= 300) {
        const newToken = await userService.generateToken(user, "5m");
        console.log(">>>>>>SE REFRESCÓ EL TOKEN");
        res.cookie('token', newToken, { httpOnly: true }) 
      }
      req.user = user;
      next();
    } catch (error) {
      next(error)
    }
  }