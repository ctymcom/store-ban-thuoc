---
to: "<%= name == 'remove_col' ? 'db/migrations/' + h.migrationDate() + '-' + name + '_' + tbl_name + '.js' : null %>"
---
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("<%= tbl_name %>", "<%= tbl_col %>", { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "<%= tbl_name %>",
          "<%= tbl_col %>",
          {
            type: Sequelize.STRING
          },
          { transaction: t }
        )
      ]);
    });
  }
};
