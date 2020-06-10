---
to: "<%= name == 'create_table' ? 'db/migrations/' + h.migrationDate() + '-' + name + '_' + tbl_name + '.js' : null %>"
---
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable(
          "<%= tbl_name %>",
          {
            id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV1,
              primaryKey: true
            },
            createdAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.NOW,
              allowNull: false
            },
            updatedAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.NOW,
              allowNull: false
            },
            deletedAt: { type: Sequelize.DATE }
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable("<%= tbl_name %>", { transaction: t })
      ]);
    });
  }
};
