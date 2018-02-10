/**
 * Created by liuwei on 2018/1/22.
 */

const Sequelize = require('sequelize');
const config = require("./config.js");


async function init(router, options) {
    global.G_MYSQL_CONNECTION = await connecttion();

    // 引入所有表
    require("./tables/T1001_User_1.js")(G_MYSQL_CONNECTION, Sequelize);
    require("./tables/T1001_User_2.js")(G_MYSQL_CONNECTION, Sequelize);
    require("./tables/T1001_User_3.js")(G_MYSQL_CONNECTION, Sequelize);
    require("./tables/T1001_User_4.js")(G_MYSQL_CONNECTION, Sequelize);
    require("./tables/T1001_User_5.js")(G_MYSQL_CONNECTION, Sequelize);
    require("./tables/T1001_User_6.js")(G_MYSQL_CONNECTION, Sequelize);
    require("./tables/T1001_User_7.js")(G_MYSQL_CONNECTION, Sequelize);
    require("./tables/T1001_User_8.js")(G_MYSQL_CONNECTION, Sequelize);
    require("./tables/T1001_User_9.js")(G_MYSQL_CONNECTION, Sequelize);
    require("./tables/T1001_User_10.js")(G_MYSQL_CONNECTION, Sequelize);

    G_EVENTS.emit("DB_Mysql_Ready");

}

/**
 * 连接Mysql数据库
 * @returns {Promise}
 */
function connecttion() {
    return new Promise(async function(reslove, reject) {
        const sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options);
        var IsReachable = true;

        try {
            await sequelize.authenticate();
        } catch (err) {
            console.error(err);
            IsReachable = false;
        } finally {
            if (IsReachable) {
                reslove(sequelize);
            } else {
                throw new Error("Unable connection to MysqlDB");
            }
        }
    })
}
module.exports.start = init;

