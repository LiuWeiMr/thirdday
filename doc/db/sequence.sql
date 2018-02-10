# 在单独的俩台服务器中创建Sequence表（获取用户表主键）
create database thirdday;
USE thirdday;
CREATE TABLE `T0001_Sequence` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`UserId`)
) ENGINE=myisam DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
# 注意：该命令将全局自动增长步长设置为2，本数据库所有自动增长步长都将为2
set global auto_increment_increment=2;

 # 注意：该命令将全局自动增长起始值设置为1，本数据库所有自动增长起始值都将为1

 # 注意：俩个库分别使用以下下个命令

set global auto_increment_offset=1;
set global auto_increment_offset=2;