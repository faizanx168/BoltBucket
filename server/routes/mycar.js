import express from "express";
import carController from "../controllers/mycar.js";
const router = express.Router();

router.get("/", carController.getCars);
router.get("/:carId", carController.getCarById);
router.post("/", carController.createCar);
router.delete("/:id", carController.deleteCar);
router.patch("/:id", carController.updateCar);
export default router;
