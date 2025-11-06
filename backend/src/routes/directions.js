import express from "express";
import {setHome, setWork, getPreferences} from "../controllers/directionsController.js";

const router = express.Router();

// POST /directions/setHome - Define endereço de casa
router.post("/setHome", setHome);
// POST /directions/setWork - Define endereço de trabalho
router.post("/setWork", setWork);
// GET /directions/preferences - Retorna preferências salvas (home/work)
router.get("/preferences", getPreferences);

export default router;