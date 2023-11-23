import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getBarberShops,
    getUserBarberShops,
    getBarberShop,
    searchBarberShops,
    createBarberShop,
    updateBarberShop,
    deleteBarberShop
} from "../controllers/barberShop.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createBarberShopSchema, updateBarberShopSchema } from "../schemas/barberShop.schema.js";

const router = Router();
    

router.get("/barberShops", authRequired, getBarberShops);
router.get("/user-barbershops/:id", authRequired, getUserBarberShops)
router.get("/barbershop/:id", authRequired, getBarberShop);
router.get("/barbershops/search", authRequired, searchBarberShops);
router.post("/barbershop", authRequired, validateSchema(createBarberShopSchema), createBarberShop);
router.put("/barbershop/:id", authRequired, validateSchema(updateBarberShopSchema), updateBarberShop);
router.delete("/barbershop/:id", authRequired, deleteBarberShop);

export default router;
