"use strict";
const { Model } = require("sequelize");
const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi dengan Genre

      Game.belongsTo(models.Genre, {
        foreignKey: "genre_id",
        as: "genre",
      });
      // relasi dengan Character
      Game.hasMany(models.Character, {
        foreignKey: "game_id",
        as: "characters",
      });
    }
  }
  Game.init(
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
      genre_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Genres", // ini tabel
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT", //ini untuk mencegah penghapusan genre jika masih ada game yang menggunakannya
      },
      release_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      developer: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  sequelizePaginate.paginate(Game);
  return Game;
};
