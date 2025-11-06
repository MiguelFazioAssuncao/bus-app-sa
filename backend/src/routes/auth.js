import express from "express";
import { register, login, me } from "../controllers/authController.js";

const router = express.Router();

// POST /auth/register - Cadastro de novo usuário
router.post("/register", register);
// POST /auth/login - Login de usuário
router.post("/login", login);
// GET /auth/me - Retorna dados do usuário autenticado
router.get("/me", me);

export default router;