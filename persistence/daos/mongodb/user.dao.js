import { UserModel } from './models/user.model.js';
import MongoDao from "../mongo.dao.js";

export default class UserDao extends MongoDao {
  constructor() {
    super(UserModel);
  }
  
  async getUserByEmaill(email){
    try {
        return await this.model.findOne({ email })
    } catch (error) {
        throw new Error(error)
    }
}
async getUserById(id){
  try {
      return await this.model.findById(id).populate("carts"); 
  } catch (error) {
      throw new Error(error)
  }
}

async getById(id) {
  try {
    // Devuelve una instancia del modelo Mongoose
    return await UserModel.findById(id).exec();
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${error.message}`);
  }
}


}
// export default class UserDao {
//   constructor(model) {
//     this.model = model;
//   }
//   async register(user) {
//     try {
//       return await this.model.create(user);
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   async getById(id) {
//     try {
//       return await this.model.findById(id);
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   async getByEmail(email) {
//     try {
//       return await this.model.findOne({ email });
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }