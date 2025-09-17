require('dotenv').config()
import User from "../models/User.js"
const crypto = require('crypto')

// chave e iv do .env
const key = Buffer.from(process.env.KEYC, 'hex') // 32 bytes
const iv  = Buffer.from(process.env.IVC, 'hex')  // 16 bytes

function crypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

function dcrypt(encryptedText) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

//Função que puxa dados do usuário e exporta criptografados e descriptografados
export async function getUserCrypto(email, plainPassword) {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new Error("Usuário não encontrado")
  }

  // variáveis originais
  const name = user.name
  const emailOriginal = user.email
  const password = plainPassword // senha digitada

  // criptografadas
  const nameCrypt = crypt(name)
  const emailCrypt = crypt(emailOriginal)
  const passCrypt = crypt(password)

  // descriptografadas
  const nameDecrypted = dcrypt(nameCrypt)
  const emailDecrypted = dcrypt(emailCrypt)
  const passDecrypted = dcrypt(passCrypt)

  return {
    original: { name, email: emailOriginal, password },
    crypted: { nameCrypt, emailCrypt, passCrypt },
    decrypted: { nameDecrypted, emailDecrypted, passDecrypted }
  }
}
export default User;

