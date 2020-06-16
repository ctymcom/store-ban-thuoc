"use strict";
var faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tbl_example",
      [
        {
          id: faker.random.uuid(),
          name: faker.company.companyName(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: faker.random.uuid(),
          name: faker.company.companyName(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: faker.random.uuid(),
          name: faker.company.companyName(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tbl_example", null, {});
  },
};
