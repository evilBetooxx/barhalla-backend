import { Router } from "express";
import { createSession, createOrder, captureOrder, cancelOrder } from "../controllers/payment.controller.js";

const router = Router();

router.post('/create-checkout-session', createSession)
router.get('/succes', (req, res) => res.redirect('/') )
router.get('/cancel', (req, res) => res.redirect('/') )

router.get('/create-order', createOrder)
router.get('/capture-order', captureOrder )
router.get('/cancel-order', cancelOrder )



export default router;