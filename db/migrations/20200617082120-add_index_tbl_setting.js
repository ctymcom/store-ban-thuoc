module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex(
      "tbl_setting",
      ["key"],
      {
        unique: true,
        logging: console.log,
      },
     
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex("tbl_setting", ["key"], {
      logging: console.log,
    });
  },
};
