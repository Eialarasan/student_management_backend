"use strict";

module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define('Student', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        studentName: {
            field: 'student_name',
            type: DataTypes.STRING(255),
            allowNull:true
        },
        createdDate:{
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
            defaultValue:1
        }

    }, {
        tableName: 'student',
        timestamps: false,
        underscored: true,

        classMethods: {

        }

    });
    Student.associate = function associate(models) {
        Student.hasMany(models.Studentskill, {
            foreignKey: 'studentId'
        });
        
    };
    return Student;
}