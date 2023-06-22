'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pel_Elpha extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Pel_Elpha.belongsTo(models.Users, {
                foreignKey: 'user_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Pel_Elpha.init(
        {
            nama: DataTypes.STRING,
            lama_bermain: DataTypes.INTEGER,
            telp: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Pel_Elpha',
        }
    );
    return Pel_Elpha;
};
