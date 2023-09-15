"use strict";

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        userName: {
            field: 'user_name',
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phoneNumber: {
            field: 'phone_number',
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            field: 'email',
            type: DataTypes.STRING(255),
            allowNull: true
        },
        password: {
            field: 'password',
            type: DataTypes.STRING(255),
            allowNull: true
        },
        createdDate: {
            field: 'created_date',
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
        tableName: 'users',
        timestamps: false,
        underscored: true,

        classMethods: {

        }

    });
    
    
    return User;
}