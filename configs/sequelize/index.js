const { Sequelize } = require('sequelize');
const { association } = require('./association');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    logging: false,
    timezone: "+01:00"
});

sequelize.connection = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connection to ${ process.env.MYSQL_DB } has been established successfully.`);
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const modelDefiners = [
    // user
    require('../../models/mysql/user/user'),
];

for(const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
};

association(sequelize);

module.exports = sequelize;
