"use strict";
const { Model } = require("sequelize");
const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi dengan Character
      Skill.belongsTo(models.Character, {
        foreignKey: "character_id",
        as: "character",
      });
    }
  }
  Skill.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      character_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Characters", // ini tabel
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT", // ini untuk mencegah penghapusan karakter jika masih ada skill yang menggunakannya
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Skill",
    }
  );
  sequelizePaginate.paginate(Skill);
  return Skill;
};
