import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserSport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Sport.belongsToMany(models.User, { through: UserSport, as: 'users', foreignKey: 'sport_id', onDelete: 'cascade' });
      models.User.belongsToMany(models.Sport, { through: UserSport, as: 'sports', foreignKey: 'user_id', onDelete: 'cascade' });
    }
  }
  UserSport.init({
    user_id: DataTypes.INTEGER,
    sport_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSport',
    timestamps: false,
  });
  return UserSport;
};
