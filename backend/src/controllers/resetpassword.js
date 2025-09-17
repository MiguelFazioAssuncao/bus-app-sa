import { DataTypes } from "sequelize";
import sequelize from "../database/client.js";
import User from "./User.js";


//requisição reset
const PasswordResetToken = sequelize.define("PasswordResetToken", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: "password_reset_tokens",
  timestamps: false
});

// Relaciona o token 
PasswordResetToken.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(PasswordResetToken, { foreignKey: "user_id" });

export default PasswordResetToken;