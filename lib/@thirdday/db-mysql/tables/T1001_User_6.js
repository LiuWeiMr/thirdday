/**
 * Created by liuwei on 2018/2/7.
 */


module.exports = function (connection, Sequelize) {
    connection.define('User_6', {
        UserId: {
            type: Sequelize.INTEGER(11)
        },
        MP: {
            type: Sequelize.INTEGER(11)
        },
        Password: {
            type: Sequelize.STRING(64)
        },
        Age: {
            type: Sequelize.INTEGER(4)
        }
    },{
        tableName: 'T1001_User_6',
        timestamps: false
    });

    connection.models.User_6.removeAttribute('id');

}
