import Controller from './class.controller.js'
import ProductService from '../service/product.services.js';
import { createResponse } from '../utils.js';
const prodService =  new ProductService();


export default class ProductController extends Controller{
  constructor(){
    super(prodService)
  }

  createProd = async(req, res, next)=>{
    try {
        const newProd = await this.service.createProd(req.body);
        return createResponse(res, 200, newProd);
    } catch (error) {
        next(error);
    }
}

  getById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const data = await this.service.getProdById(id);
        return createResponse(res, 200, data);
    } catch (error) {
        next(error)
    }
}
  getAll = async (req, res, next) => {
  try {
    const { page, limit, name, sort } = req.query;
    const response = await service.getAll(page, limit, name, sort);
    const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null;
    const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null;
    res.json({
      payload: response.docs,
      info: {
        count: response.totalDocs,
        totalPages: response.totalPages,
        nextLink: next,
        prevLink: prev,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage
      }
    });
    // res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

}

// import * as service from "../service/product.services.js";


// export const getById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const response = await service.getById(id);
//     if (!response) res.status(404).json({ msg: "Product Not found!" });
//     else res.status(200).json(response);
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const create = async (req, res, next) => {
//   try {
//     const newProd = await service.create(req.body);
//     if (!newProd) res.status(404).json({ msg: "Error create product!" });
//     else res.status(200).json(newProd);
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const update = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const prodUpd = await service.update(id, req.body);
//     if (!prodUpd) res.status(404).json({ msg: "Error update product!" });
//     else res.status(200).json(prodUpd);
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const remove = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const prodDel = await service.remove(id);
//     if (!prodDel) res.status(404).json({ msg: "Error delete product!" });
//     else res.status(200).json({ msg: `Product id: ${id} deleted` });
//   } catch (error) {
//     next(error.message);
//   }
// };