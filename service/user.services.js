import Services from "./class.services.js";
import UserDaoMongo from "../persistence/daos/mongodb/user.dao.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createHash, hasBeenMoreThanXTime, isValidPassword } from "../utils.js";
import CartDaoMongo from "../persistence/daos/mongodb/cart.dao.js";
import UserRepository from "../persistence/repository/user.repository.js";
import { sendMail } from "./mailling.services.js";
const userRepository = new UserRepository();

const userDao = new UserDaoMongo();
const cartDao = new CartDaoMongo()

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }


  generateToken(user, time = '5m') {
    const payload = {
      userId: user._id
    };
    return jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: time });
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getUserByEmaill(email);
      if (!existUser) {
        const cartUser = await cartDao.create();
        if (
          email === process.env.EMAIL_ADMIN &&
          password === process.env.PASS_ADMIN
        ) {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "admin",
            cart: cartUser._id,
          });
          await sendMail(user, "register");
          return newUser;
        } else {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            cart: cartUser._id,
          });
          await sendMail(user, "register");
          return newUser;
        }
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getUserByEmaill(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if (userExist && passValid)
        await this.updateLastConnection(userExist._id);
         return this.generateToken(userExist);
    } catch (error) {
      throw new Error(error);
    }
  }

  getUserById = async (id) => {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  async getById(id) {
    return await this.dao.getById(id);}

  async generateResetPass(user) {
    try {
      return this.generateToken(user, '1h');
    } catch (error) {
      throw new Error(error)
    }
  }

  async updatePass(pass, user){
    try {
      //verificar que la nueva contraseña no sea igual a la anterior
      const isEqual = isValidPassword(pass, user);
      if(isEqual) return null;
      const newPass = createHash(pass);
      return await this.dao.update(user._id, { password: newPass });
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateLastConnection(userId){
    return await this.dao.update(userId,{
      last_connection: new Date
    });
  }

  async checkUsersLastConnection(){
    try {
      const usersInactive = [];
      const users = await this.dao.getAll();
      if(users.length > 0){
        for(const user of users){
          user.last_connection && hasBeenMoreThanXTime(user.last_connection);{
            console.log(`han pasado mas de 48hs desde la ultima conexion: ${user._id}`);
              await this.dao.update(user._id);{
                active: false
              }
              usersInactive.push(user)
          }
      }
    }
    return usersInactive;

    } catch (error) {
      throw new Error(error)
    }
  }

  async logout(userId) {
    try {
      await this.updateLastConnection(userId);
      return { message: "Logout successful" };
    } catch (error) {
      throw new Error(error);
    }
  };

  async deleteInactiveUsers(timeLimit) {
    try {
      const usersToDelete = [];
      const users = await this.dao.getAll();
      
      if (users.length > 0) {
        for (const user of users) {
          if (user.last_connection && hasBeenMoreThanXTime(user.last_connection, timeLimit)) {
            console.log(`Eliminando usuario inactivo: ${user._id}`);
            
            // Eliminar usuario
            await this.dao.delete(user._id);

            await sendMail(user, "accountDeletion");
            
            usersToDelete.push(user);
          }
        }
      }

      return usersToDelete;

    } catch (error) {
      throw new Error(error);
    }
  }

};

