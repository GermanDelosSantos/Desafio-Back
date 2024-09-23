import { Router } from 'express';
import ProductController from '../controllers/product.controllers.js';
import { checkAdmin } from '../midlewares/checkAdmin.js';
import { checkAuth } from '../midlewares/checkJwt.js';
const controller = new ProductController();

const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', [checkAuth, checkAdmin], controller.create);

router.post('/premium', [checkAuth], controller.createProductPremium);

router.post('/mockingproducts', [checkAuth, checkAdmin], controller.createProductsMock);

router.put('/:id', checkAuth, controller.updatePremium);

router.delete('/:id', [checkAuth, checkAdmin], controller.delete);

router.delete('/premium-delete/:id', [checkAuth, checkAdmin], controller.deleteProduct);

export default router;