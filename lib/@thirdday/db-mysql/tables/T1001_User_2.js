/**
 * Created by liuwei on 2018/2/7.
 */


module.exports = function (connection, Sequelize) {
    connection.define('User_2', {
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
        tableName: 'T1001_User_2',
        timestamps: false
    });

    connection.models.User_2.removeAttribute('id');

}
