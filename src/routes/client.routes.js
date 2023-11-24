import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getClients,
    getClient,
    updateClient,
    deleteClient,
    uploadImage
} from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { updateClientSchema } from "../schemas/client.schema.js";
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
        allowed_formats: ["jpg", "png", "jpeg"]
    }
})

const upload = multer({ storage })

const router = Router();


router.get("/clients", authRequired, getClients);
router.get("/client/:id", authRequired, getClient);
router.put("/client/:id", authRequired, validateSchema(updateClientSchema), updateClient);
router.delete("/client/:id", authRequired, deleteClient);
router.post("/upload", [authRequired, upload.single('file')] , uploadImage);

export default router;
