import Controllers from "./class.controller.js";
import ProductService from "../service/product.services.js";
const prodService = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(prodService);
  }


  createProductsMock = async (req, res) => {
    try {
      const { cant } = req.query
      res.json(await prodService.createProductsMock(cant))

    } catch (error) {
      next(error);
    }
  };

  async createProductPremium(req, res, next) {
    try {
      const { name, description, price, stock } = req.body;
      const owner = req.user.email; // Asumiendo que el correo del usuario es el valor para el campo owner

      const newProduct = await prodService.create({ name, description, price, stock , owner });

      res.status(201).json({ message: 'Producto creado correctamente', product: newProduct });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  deleteProduct = async (req, res, next) => {
    try {
      const {product} = req.params;
      const {user} = req.user;

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      if (user.role !== 'admin' && product.owner !== user.email) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
      }

      await prodService.remove();
      res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
      next(error);
    }
  };

  updatePremium = async (req, res, next) => {
    try {
      const {product} = req.params;
      const {user} = req.user;

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      if (user.role !== 'admin' && product.owner !== user.email) {
        return res.status(403).json({ message: 'No tienes permiso para actualizar este producto' });
      }

      await prodService.updatePremium();
      res.status(200).json({ message: 'Producto actualizado' });
    } catch (error) {
      next(error);
    }
  };
};