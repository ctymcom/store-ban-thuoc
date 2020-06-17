module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "tbl_setting",
          {
            id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV1,
              primaryKey: true,
            },
            settingGroupId: {
              type: Sequelize.UUID,
              references: {
                model: "tbl_setting_group",
                key: "id",
              },
            },
            type: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            name: {
              type: Sequelize.TEXT,
              allowNull: false,
            },
            key: {
              type: Sequelize.TEXT,
              allowNull: false,
            },
            value: {
              type: Sequelize.TEXT,
            },
            isActive: {
              type: Sequelize.BOOLEAN,
              defaultValue: true,
            },
            isPrivate: {
              type: Sequelize.BOOLEAN,
              defaultValue: false,
            },
            readOnly: {
              type: Sequelize.BOOLEAN,
              defaultValue: false,
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
        queryInterface.dropTable("tbl_setting", { transaction: t }),
      ]);
    });
  },
};
