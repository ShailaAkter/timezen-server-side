import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createBrandController } from '../controllers/brandController/createBrandController.js';
import { updateBrandController } from '../controllers/brandController/updateBrandController.js';
import { getAllBrandController } from '../controllers/brandController/getAllBrandController.js';
import { getBrandController } from '../controllers/brandController/getBrandController.js';
import { deleteBrandController } from '../controllers/brandController/delete-brandController.js';

const router = express.Router();


//routing for brand post method
router.post('/create-brand', requireSignIn, isAdmin, createBrandController);

//routing for update brand put method
router.put('/update-brand/:id', requireSignIn, isAdmin, updateBrandController)

//routing for get all brands get method
router.get('/all-brands', getAllBrandController)

//routing for get brand by id get method
router.get('/get-brand/:slug', getBrandController)

//routing for delete brand by id delete method
router.delete('/delete-brand/:id', requireSignIn, isAdmin, deleteBrandController)

export default router;