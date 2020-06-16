module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable(
          "tbl_setting_group",
          {
            id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV1,
              primaryKey: true
            },
            slug: {
              type: Sequelize.TEXT,
              allowNull: false
            },
            name: {
              type: Sequelize.TEXT,
              allowNull: false
            },
            desc: {
              type: Sequelize.TEXT
            },
            readOnly: {
              type: Sequelize.BOOLEAN,
              defaultValue: false
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
        queryInterface.dropTable("tbl_setting_group", { transaction: t })
      ]);
    });
  }
};
