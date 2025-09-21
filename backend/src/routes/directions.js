import express from "express";
import {setHome, setWork} from "../controllers/directionsController.js";

const router = express.Router();


router.post("/setHome", setHome);
router.post("/setWork", setWork);

export default router;