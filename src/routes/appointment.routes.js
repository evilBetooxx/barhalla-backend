import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getAppointments,
    getUserAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
} from "../controllers/appointment.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAppointmentSchema, updateAppointmentSchema } from "../schemas/appointment.schema.js";

const router = Router();

router.get("/appointments", authRequired, getAppointments);
router.get("/user-appointments", authRequired, getUserAppointments);
router.post("/appointment", authRequired, validateSchema(createAppointmentSchema), createAppointment);
router.put("/appointment/:id", authRequired, validateSchema(updateAppointmentSchema), updateAppointment);
router.delete("/appointment/:id", authRequired, deleteAppointment);

export default router;

