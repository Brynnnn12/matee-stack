const { execSync } = require("child_process");

module.exports = function (plop) {
  // Controller Generator
  plop.setGenerator("controller", {
    description: "Buat Controller baru",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Controller name (tanpa "Controller" di akhir):',
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/controllers/{{pascalCase name}}Controller.js",
        templateFile: "plop-templates/controller.hbs",
      },
    ],
  });

  // Middleware Generator
  plop.setGenerator("middleware", {
    description: "Buat Middleware baru",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Masukkan nama middleware (tanpa 'Middleware' di akhir):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/middleware/{{camelCase name}}.js",
        templateFile: "plop-templates/middleware.hbs",
      },
    ],
  });

  // Route Generator
  plop.setGenerator("route", {
    description: "Buat route baru",
    prompts: [{ type: "input", name: "name", message: "Masukan nama rute:" }],
    actions: [
      {
        type: "add",
        path: "src/routes/{{camelCase name}}.js",
        templateFile: "plop-templates/route.hbs",
      },
    ],
  });

  // Sequelize Model, Migration, Seeder Generator
  plop.setGenerator("sequelize-model", {
    description:
      "Generate model, migration, dan seeder menggunakan Sequelize CLI",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Nama model (PascalCase), contoh: User",
      },
      {
        type: "input",
        name: "attributes",
        message: "Attributes (misal: name:string, email:string, age:integer)",
      },
    ],
    actions: [
      function generateModelAndMigration(answers) {
        const cmd = `npx sequelize-cli model:generate --name ${answers.name} --attributes ${answers.attributes}`;
        try {
          execSync(cmd, { stdio: "inherit" });
          return `✅ Model dan migration untuk ${answers.name} berhasil dibuat.`;
        } catch (err) {
          return `❌ Gagal membuat model dan migration: ${err.message}`;
        }
      },
      function generateSeeder(answers) {
        const cmd = `npx sequelize-cli seed:generate --name ${answers.name.toLowerCase()}-seed`;
        try {
          execSync(cmd, { stdio: "inherit" });
          return `✅ Seeder untuk ${answers.name} berhasil dibuat.`;
        } catch (err) {
          return `❌ Gagal membuat seeder: ${err.message}`;
        }
      },
    ],
  });

  // View Generator
  plop.setGenerator("view", {
    description: "Buat file view baru (EJS)",
    prompts: [
      {
        type: "input",
        name: "filename",
        message:
          "Masukkan path & nama file view (misal: dashboard/roles/customView):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/views/{{filename}}.ejs",
        template: "",
      },
    ],
  });

  // Validation Generator
  plop.setGenerator("validation", {
    description: "Buat file validasi baru (misal: auth, user, product)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Nama validation (misal: auth, user, product):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/validation/{{camelCase name}}Validation.js",
        templateFile: "plop-templates/validation.hbs",
      },
    ],
  });
};
