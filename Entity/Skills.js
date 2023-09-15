"use strict";

module.exports = function (sequelize, DataTypes) {
    const Skills = sequelize.define('Skills', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        SkillName: {
            field: 'skill_name',
            type: DataTypes.STRING(255),
            allowNull: true
        },

      

    }, {
        tableName: 'Skills',
        timestamps: false,
        underscored: true,

        classMethods: {

        }

    });
    Skills.associate = function associate(models) {
        Skills.hasMany(models.Studentskill, {
            foreignKey: 'SkillId'
        });
    };
    return Skills;
}