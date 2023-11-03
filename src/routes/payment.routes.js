import { Router } from "express";
import { createSession } from "../controllers/payment.controller.js";

const router = Router();

router.get('/create-checkout-session', createSession)
router.get('/succes', (req, res) => res.redirect('/') )
router.get('/cancel', (req, res) => res.redirect('/') )


export default router;