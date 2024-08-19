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

  createProductPremium = async (req, res) => {
    try {
      const user = req.user;

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
      const product = req.params;
      const user = req.user;

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
};