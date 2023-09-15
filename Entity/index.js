 const Sequelize=require('sequelize')
require('dotenv').config()

var db = {
    sequelize: new Sequelize({
        host: process.env.HOST,
        database: process.env.DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dialect:'mysql'
     } )
};
// db.sequelize.sync({force:true})
db.User = require('./User')(db.sequelize, Sequelize.DataTypes)
db.Student = require('./Student')(db.sequelize, Sequelize.DataTypes)
db.Studentskill = require('./Studentskill')(db.sequelize, Sequelize.DataTypes)
db.Skills = require('./Skills')(db.sequelize, Sequelize.DataTypes)

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});
module.exports = db;