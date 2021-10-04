import { hash } from "../../utils/hashUtil";
import model from "../../models";
const { User, Sport } = model;

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

    const demo = await User.create({
      name: 'Richie Nabuk',
      email: 'richie@strype.com',
      password: hash('Password111'),
      phone: '08091234567',
    });

    const userSports = await Sport.findAll({ where: { id: [1, 2] } });
    await demo.addSport(userSports);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('UserSports', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
