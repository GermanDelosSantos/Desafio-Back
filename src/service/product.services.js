import Services from "./class.services.js";
import ProductDaoMongo from "../persistence/daos/mongodb/product.dao.js";
import UserDao from "../persistence/daos/mongodb/user.dao.js";
import { generateFakerProduct } from '../utils/product.utils.js'
const prodDao = new ProductDaoMongo();
const userDao = new UserDao();

export default class ProductService extends Services {
  constructor() {
    super(prodDao);
  }

  createProductsMock = async (cant = 100) => {
    try {
      const productsArray = [];
      for (let i = 0; i < cant; i++) {
        const product = generateFakerProduct();
        productsArray.push(product);
      }
      return await prodDao.create(productsArray);
    } catch (error) {
      throw new Error(error);
    }
  };

  createProductPremium = async (req, res) => {
    try {
      const user = await userDao.findById(req.user._id);

      if (user.role !== 'premium') {
        return res.status(403).json({ message: 'Solo los usuarios premium pueden crear productos' });
      }

      const newProduct = new Product({
        ...req.body,
        owner: user.email || 'admin'
      });

      await newProduct.create();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto' });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const product = await prodDao.findById(req.params._id);
      const user = await userDao.findById(req.user._id);
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      if (user.role !== 'admin' && product.owner !== user.email) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
      }
  
      await product.remove();
      res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto' });
    }
  };

  updatePremium = async (req, res) =>{
    try {
      const product = await prodDao.findById(req.params._id);
      const user = await userDao.findById(req.user._id);
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      if( user.role !== 'premium' && product.owner !== user.mail){
        return res.status(403).json({ message : 'No eres el creador del producto o no tienes permiso para hacerlo'})
      }
      await product.update()
      res.status(200).json({ message: 'Producto actualizado con exito'})
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto' });

    }

  }

};