module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex(
      "tbl_setting_group",
      ["slug"],
      {
        unique: true,
        logging: console.log,
      },
     
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex("tbl_setting_group", ["slug"], {
      logging: console.log,
    });
  },
};
