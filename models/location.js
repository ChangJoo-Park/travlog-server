module.exports = (sequelize, DataTypes) => {
  let Location = sequelize.define('location', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    locality: DataTypes.STRING,
    administrativeAreaLevel1: DataTypes.STRING,
    administrativeAreaLevel2: DataTypes.STRING,
    country: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    name: DataTypes.STRING,
    placeId: DataTypes.STRING,
    reference: DataTypes.STRING,
    isDrop: DataTypes.BOOLEAN,
    dropAt: DataTypes.DATE
  }, {});

  // models.destination, { foreignKey: 'lid', sourceKey: 'lid' }
  return Location;
};