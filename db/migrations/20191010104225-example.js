module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "tbl_example",
          {
            id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV1,
              primaryKey: true,
            },
            name: {
              type: Sequelize.TEXT,
            },
            exampleId: {
              type: Sequelize.UUID,
            },
            createdAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.NOW,
              allowNull: false,
            },
            updatedAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.NOW,
              allowNull: false,
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
        queryInterface.dropTable("tbl_example", { transaction: t }),
      ]);
    });
  },
};
