import express from 'express';
import { addToCart, getCart } from '../controllers/cart.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/add-to-cart', verifyJWT, addToCart);
router.get('/cart', verifyJWT, getCart);

export default router;
