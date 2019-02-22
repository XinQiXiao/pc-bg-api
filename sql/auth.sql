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

/*==============================================================*/
/* auth city                                */
/*==============================================================*/
CREATE TABLE `auth_city` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `display_name` varchar(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*==============================================================*/
/* auth user                               */
/*==============================================================*/
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `login_name` varchar(64) NOT NULL DEFAULT '',
  `email` varchar(128) NOT NULL DEFAULT '',
  `password_hashed` varchar(32) NOT NULL,
  `salt` char(6) NOT NULL,
  `display_name` varchar(64) NOT NULL DEFAULT '',
  `mobile` varchar(64) NOT NULL,
  `created_at` bigint(20) unsigned NOT NULL,
  `create_ip` varchar(16) NOT NULL DEFAULT '',
  `status` int(10) unsigned NOT NULL COMMENT '0:冻结, 1:激活, 10:待激活',
  `city_id` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '用户类型: 1.员工 ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_name` (`login_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;