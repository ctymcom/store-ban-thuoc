---
to: "<%= name == 'add_index' ? 'db/migrations/' + h.migrationDate() + '-' + name + '_' + tbl_name + '.js' : null %>"
---
module.exports = {
  up: async function (queryInterface, Sequelize) {
    return await queryInterface.addIndex('<%= tbl_name %>', ['<%= tbl_col %>'], {
      indexName: 'index_<%= tbl_name %>_<%= tbl_col %>_key',
      indicesType: 'UNIQUE',
      where: {
        deletedAt: null
      }
    })
  },

  down: async function (queryInterface, Sequelize) {
    return await queryInterface.removeIndex(
      '<%= tbl_name %>', 
      'index_<%= tbl_name %>_<%= tbl_col %>_key')
  }
};