"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query(`
    CREATE EXTENSION IF NOT EXISTS unaccent;
    CREATE TEXT SEARCH CONFIGURATION usimple ( COPY = simple );
    ALTER TEXT SEARCH CONFIGURATION usimple ALTER MAPPING
    FOR hword, hword_part, word WITH unaccent, simple;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query(
      `
      DROP EXTENSION unaccent;
      DROP TEXT SEARCH CONFIGURATION usimple;
    `
    );
  },
};
