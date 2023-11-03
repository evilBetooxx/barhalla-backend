import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getClients,
    getClient,
    updateClient,
    deleteClient
} from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { updateClientSchema } from "../schemas/client.schema.js";

const router = Router();

router.get("/clients", authRequired, getClients);
router.get("/client/:id", authRequired, getClient);
router.put("/client/:id", authRequired, validateSchema(updateClientSchema), updateClient);
router.delete("/client/:id", authRequired, deleteClient);

export default router;
