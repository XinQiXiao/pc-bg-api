/*==============================================================*/
/* 图书列表表                                        */
/*==============================================================*/
DROP TABLE IF EXISTS `book_category`;
CREATE TABLE `book_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  `parent_id` int(11) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='图书类别';

/*==============================================================*/
/* 图书信息表                                        */
/*==============================================================*/
DROP TABLE IF EXISTS `book_info`;
CREATE TABLE `book_info` (
  `book_id` int(11) NOT NULL,
  `book_category_id` int(11) DEFAULT NULL,
  `book_name` varchar(20) NOT NULL,
  `author` varchar(20) NOT NULL,
  `price` float(5,2) NOT NULL,
  `press` varchar(20) DEFAULT '机械工业出版社',
  `pubdate` date NOT NULL,
  `store` int(11) NOT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `book_name` (`book_name`),
  KEY `fk_bcid` (`book_category_id`),
  CONSTRAINT `fk_bcid` FOREIGN KEY (`book_category_id`) REFERENCES `book_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;