"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Characters", {
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
      game_id: {
        type: Sequelize.UUID,
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Characters");
  },
};
