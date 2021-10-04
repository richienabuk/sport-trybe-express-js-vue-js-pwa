import {hash} from "../../utils/hashUtil";
import model from "../../models";
const { User } = model;

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

    await User.create({
      name: 'Richie Nabuk',
      email: 'richie@strype.com',
      password: hash('Password111'),
      phone: '08091234567',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
