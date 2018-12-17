/*==============================================================*/
/* 使用log  [model 与 sql 并不一致]                                */
/*==============================================================*/
DROP TABLE IF EXISTS `user_access_log`;
CREATE TABLE `user_access_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `request_uri` varchar(256) NOT NULL DEFAULT '',
  `request` text NOT NULL,
  `method` varchar(6) NOT NULL,
  `allowed` tinyint(4) NOT NULL,
  `client_ip` varchar(200) NOT NULL DEFAULT '',
  `headers` text,
  `timestamp` bigint(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;