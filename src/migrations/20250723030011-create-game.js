"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      genre_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Genres", // ini tabel
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT", //ini untuk mencegah penghapusan genre jika masih ada game yang menggunakannya
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      developer: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Games");
  },
};
