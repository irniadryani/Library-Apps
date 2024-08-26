module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('books', 'old_book', {
      type: Sequelize.BOOLEAN,
      allowNull: true, 
      defaultValue: null 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('books', 'old_book', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    });
  }
};
