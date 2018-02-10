# 这个文件整合了所有thirdday基础表建库建表sql结合sequence.sql文件在其他俩台服务器运行可创建所有Mysql库和表。直接执行可创建thirdday的Mysql库，

# 注意：执行sequence.sql脚本注意第13行提示！！！。

create database thirdday;
USE thirdday;
#批量创建User表：返回结果说明：CG：成功、SB失败
drop procedure if EXISTS `create_user_table_batch`;
DELIMITER //
CREATE PROCEDURE create_user_table_batch(
	IN tableCount INT,
	OUT rStatus varchar(32)    # 创建状态
	)
BEGIN
    DECLARE i INT default 1;    # 表名
    DECLARE `@tableName` varchar(32);    # 表名
    DECLARE `@createSql` VARCHAR(2560);    # 创建表sql语句

	set rStatus='SB';
	set @tableName='T1001_User';
	while i<=tableCount do
		set @tableName=concat(@tableName,'_',i);
		set @tableCo=concat(@tableCo,i);
		SET @createSql = CONCAT('CREATE TABLE ',@tableName,' (',
  			'UserId int(11) NOT NULL COMMENT "用户编码",',
  			'MP int(11)  NOT NULL COMMENT "手机",',
  			'Password varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT "密码",',
    		'Age int(4) DEFAULT NULL COMMENT "年龄",',
 	 		'PRIMARY KEY (UserId),',
			'INDEX `MP` (MP)',
		') ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin');
       	prepare stmt from @createSql;
        execute stmt;
        set i=i+1;
        set @tableName='T1001_User';
	end while;
	set rStatus='CG';
END  //
DELIMITER ;
call create_user_table_batch(10,@status);
select @status as status;