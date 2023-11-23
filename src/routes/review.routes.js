import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createReview,
  getReviews,
  getReviewsByUserId,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createReviewSchema, updateReviewSchema } from "../schemas/review.schema.js";

const router = Router();

router.post("/reviews", authRequired, validateSchema(createReviewSchema), createReview);
router.get("/reviews", authRequired, getReviews);
router.get("/reviews/:id", authRequired, getReviewsByUserId);
router.put("/review/:id", authRequired, validateSchema(updateReviewSchema), updateReview);
router.delete("/review/:id", authRequired, deleteReview);

export default router;
