"use strict";
const { v4 } = require("uuid");
/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        id: v4(),
        name: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
