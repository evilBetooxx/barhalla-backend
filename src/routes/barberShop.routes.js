import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getBarberShops,
  getUserBarberShops,
  getBarberShop,
  searchBarberShops,
  createBarberShop,
  uploadLogo,
  updateBarberShop,
  deleteBarberShop,
} from "../controllers/barberShop.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  createBarberShopSchema,
  updateBarberShopSchema,
} from "../schemas/barberShop.schema.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dn1ng7anm",
  api_key: "914752262761932",
  api_secret: "oyCgLbA1Ui12EAO6UT7mvrdKc-o",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "clients",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

const router = Router();

router.get("/barberShops", authRequired, getBarberShops);
router.get("/user-barbershops", authRequired, getUserBarberShops);
router.get("/barbershop/:id", authRequired, getBarberShop);
router.get("/barbershops/search", authRequired, searchBarberShops);

router.post("/barbershop", authRequired, createBarberShop);
router.post("/upload-logo", [authRequired, upload.single("file")], uploadLogo);

router.put(
  " :id",
  authRequired,
  validateSchema(updateBarberShopSchema),
  updateBarberShop
);
router.delete("/barbershop/:id", authRequired, deleteBarberShop);

export default router;
