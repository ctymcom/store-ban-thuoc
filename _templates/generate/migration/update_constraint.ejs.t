---
to: "<%= name === 'update_constraint' ? 'db/migrations/' + h.migrationDate() + '-' + name + '_' + 'for' + '_' + tbl_name + '.js' : null %>"
---
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.sequelize.query(
          `
          ALTER TABLE <%= tbl_name %> DROP CONSTRAINT "<%= tbl_name %>_<%= tbl_col %>_fkey";
        `,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `
          ALTER TABLE <%= tbl_name %> ADD CONSTRAINT "<%= tbl_name %>_<%= tbl_col %>_fkey" FOREIGN KEY ("<%= tbl_col %>") REFERENCES <%= ftable %>(<%= fcol %>) on DELETE SET NULL;
        `,
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.sequelize.query(
          `
          ALTER TABLE <%= tbl_name %> DROP CONSTRAINT "<%= tbl_name %>_<%= tbl_col %>_fkey";
        `,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `
          ALTER TABLE <%= tbl_name %> ADD CONSTRAINT "<%= tbl_name %>_<%= tbl_col %>_fkey" FOREIGN KEY ("<%= tbl_col %>") REFERENCES <%= ftable %>(<%= fcol %>);
        `,
          { transaction: t }
        )
      ]);
    });
  }
};
