import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getBarberShops,
    getBarberShop,
    createBarberShop,
    updateBarberShop,
    deleteBarberShop
} from "../controllers/barberShop.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createBarberShopSchema, updateBarberShopSchema } from "../schemas/barberShop.schema.js";

const router = Router();

router.get("/barberShops", authRequired, getBarberShops);
router.get("/barbershop/:id", authRequired, getBarberShop);
router.post("/barbershop", authRequired, validateSchema(createBarberShopSchema), createBarberShop);
router.put("/barbershop/:id", authRequired, validateSchema(updateBarberShopSchema), updateBarberShop);
router.delete("/barbershop/:id", authRequired, deleteBarberShop);

export default router;