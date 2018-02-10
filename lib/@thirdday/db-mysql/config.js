/**
 * Created by liuwei on 2018/2/7.
 */

module.exports = {
    sequelize: {
        database: "thirdday",
        username: "root",
        password: "123456",
        options: {
            host: '192.168.1.114',
            dialect: 'mysql',
            pool: {
                max: 100,
                min: 10,
                acquire: 30000,
                idle: 10000
            }
        }
    }
}