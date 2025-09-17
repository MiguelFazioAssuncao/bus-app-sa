import express from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import PasswordResetToken from "../models/PasswordResetToken.js";

const router = express.Router();

//Solicitação 
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  // Gera token 
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); 

  await PasswordResetToken.create({
    user_id: user.id,
    token,
    expires_at: expires
  });

  // email de recuperação
  console.log(`Link de recuperação: https://busapp.com/reset?token=${token}`);

  res.json({ message: "E-mail de recuperação enviado" });
});

 //post Redefinir senha 
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  const resetToken = await PasswordResetToken.findOne({
    where: { token },
    include: User
  });

  if (!resetToken || resetToken.expires_at < new Date()) {
    return res.status(400).json({ message: "Token inválido ou expirado" });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await resetToken.User.update({ password: hash });

  res.json({ message: "Senha alterada com sucesso" });
});

export default router;