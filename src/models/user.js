"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi: User belongsTo Role
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validasi email
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100], // Validasi panjang password
        },
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      hooks: {
        // Menggunakan bcrypt untuk mengenkripsi password sebelum menyimpan ke database
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }

          // Set default role menjadi 'User' jika roleId belum diisi
          if (!user.roleId) {
            const Role = sequelize.models.Role;
            console.log("Mencari role User...");
            const userRole = await Role.findOne({ where: { name: "User" } });
            console.log("Role found:", userRole);
            if (userRole) {
              user.roleId = userRole.id;
            } else {
              throw new Error(
                "Role default 'User' tidak ditemukan. Pastikan data role sudah ada di database."
              );
            }
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );
  User.prototype.correctPassword = async function (reqPassword) {
    return await bcrypt.compare(reqPassword, this.password);
  };
  return User;
};
