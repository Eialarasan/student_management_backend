"use strict";

module.exports = function (sequelize, DataTypes) {
    const Studentskill = sequelize.define('Studentskill', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        skillId: {
            field: 'skill_id',
            type: DataTypes.INTEGER,
            allowNull: true
        },
        studentId: {
            field: 'student_id',
            type: DataTypes.INTEGER,
            allowNull: true
        },
        percentage: {
            field: 'percentage',
            type: DataTypes.DECIMAL,
            allowNull: true
        },

        createdDate: {
            field: 'created_date',
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedDate: {
            field: 'updated_date',
            type: DataTypes.DATE,
            allowNull: true
        },
        isActive: {
            field: 'is_active',
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        }

    }, {
        tableName: 'Studentskill',
        timestamps: false,
        underscored: true,

        classMethods: {

        }

    });
    Studentskill.associate = function associate(models) {
        Studentskill.belongsTo(models.Student, {
            foreignKey: 'studentId'
        });
        Studentskill.belongsTo(models.Skills, {
            foreignKey: 'skillId'
        });
    };
    return Studentskill;
}