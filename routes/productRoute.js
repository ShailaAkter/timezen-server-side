import express from 'express';
import { createProductController } from '../controllers/productController/createProductController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { getAllProductsController } from '../controllers/productController/getAllProductsController.js';
import { getProductController } from '../controllers/productController/getProductController.js';
import { productPhotoController } from '../controllers/productController/productPhotoController.js';
import { deleteProductController } from '../controllers/productController/deleteProductController.js';
import { updateProductController } from '../controllers/productController/updateProductController.js';
import { productFiltersController } from '../controllers/productController/productFiltersController.js';
import { productCountController, productPerPageContoller } from '../controllers/productController/productCountController.js';
import { searchProductController } from '../controllers/productController/searchProductController.js';
import { similarProductController } from '../controllers/productController/similarProductsController.js';
import { productByBrandController } from '../controllers/productController/productByBrandController.js';
import { paymentController, tokenController } from '../controllers/productController/paymentGatewayController.js';

const router = express.Router();

//routing for creating product put method
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//routing for updating product post method
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//routing for get all products get method
router.get('/get-products',  getAllProductsController);

//routing for single product get method
router.get('/get-product/:slug',  getProductController);

//routing for getting photo get method
router.get('/product-photo/:pid',  productPhotoController);

//routing for delete product delete method
router.delete('/delete-product/:pid',  deleteProductController);

//routing for  filter product by brand
router.post('/filter-products',  productFiltersController);

//routing for  get product by brand
router.get('/product-brand/:slug',  productByBrandController);

//total products 
router.get('/total-products',  productCountController);

//product count per page
router.get('/products/:page',  productPerPageContoller);

//search product 
router.get('/search-product/:keyword',  searchProductController);

//search product 
router.get('/similar-products/:productId/:brandId', similarProductController );

//braintree token router for payment
router.get('/braintree/token', tokenController );

//payments routes
router.post('/braintree/payment', requireSignIn, paymentController );



export default router;