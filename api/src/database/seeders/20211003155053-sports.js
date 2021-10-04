export default {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

  await queryInterface.bulkInsert('Sports', [
      { name: 'Football' },
      { name: 'Basketball' },
      { name: 'Ice Hockey' },
      { name: 'Volleyball' },
      { name: 'Motorsports' },
      { name: 'Bandy' },
      { name: 'Rugby' },
      { name: 'Skiing' },
      { name: 'Shooting' },
      { name: 'Others' },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Sports', null, {});
  }
};
