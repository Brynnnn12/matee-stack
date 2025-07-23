"use strict";
const { Model } = require("sequelize");
const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi dengan Game
      Character.belongsTo(models.Game, {
        foreignKey: "game_id",
        as: "game",
      });
      // relasi dengan Skill
      Character.hasMany(models.Skill, {
        foreignKey: "character_id",
        as: "skills",
      });
    }
  }
  Character.init(
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
      slug: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      game_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Games", // ini tabel
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT", // ini untuk mencegah penghapusan game jika masih ada karakter yang menggunakannya
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
      modelName: "Character",
    }
  );

  sequelizePaginate.paginate(Character);

  return Character;
};
