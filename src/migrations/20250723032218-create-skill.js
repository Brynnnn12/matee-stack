"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Skills", {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      character_id: {
        type: Sequelize.UUID,
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Skills");
  },
};
