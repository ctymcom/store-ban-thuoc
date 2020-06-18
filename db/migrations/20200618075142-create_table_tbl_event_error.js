module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "tbl_event_error",
          {
            id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV1,
              primaryKey: true,
            },
            type: {
              type: Sequelize.STRING,
              allowNull: false
            },
            data: {
              type: Sequelize.JSONB,
              defaultValue: {},
            },
            status: {
              type: Sequelize.STRING
              // error | resolved
            },
            createdAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.NOW,
            },
            updatedAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.NOW,
            },
            deletedAt: { type: Sequelize.DATE },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("tbl_event_error", { transaction: t }),
      ]);
    });
  },
};
