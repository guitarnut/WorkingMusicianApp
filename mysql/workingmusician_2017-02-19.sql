# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.16)
# Database: workingmusician
# Generation Time: 2017-02-19 20:29:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table application_stats
# ------------------------------------------------------------

DROP TABLE IF EXISTS `application_stats`;

CREATE TABLE `application_stats` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table form_options_availability
# ------------------------------------------------------------

DROP TABLE IF EXISTS `form_options_availability`;

CREATE TABLE `form_options_availability` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

LOCK TABLES `form_options_availability` WRITE;
/*!40000 ALTER TABLE `form_options_availability` DISABLE KEYS */;

INSERT INTO `form_options_availability` (`id`, `value`)
VALUES
	(1,'Weekend Nights'),
	(2,'24-7'),
	(3,'Weekday Nights');

/*!40000 ALTER TABLE `form_options_availability` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table form_options_genres
# ------------------------------------------------------------

DROP TABLE IF EXISTS `form_options_genres`;

CREATE TABLE `form_options_genres` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

LOCK TABLES `form_options_genres` WRITE;
/*!40000 ALTER TABLE `form_options_genres` DISABLE KEYS */;

INSERT INTO `form_options_genres` (`id`, `value`)
VALUES
	(23,'Rock'),
	(24,'Bluegrass');

/*!40000 ALTER TABLE `form_options_genres` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table form_options_instruments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `form_options_instruments`;

CREATE TABLE `form_options_instruments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

LOCK TABLES `form_options_instruments` WRITE;
/*!40000 ALTER TABLE `form_options_instruments` DISABLE KEYS */;

INSERT INTO `form_options_instruments` (`id`, `value`)
VALUES
	(7,'Guitar'),
	(10,'Acoustic Drum Set'),
	(11,'Electronic Drum Set');

/*!40000 ALTER TABLE `form_options_instruments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table form_options_profession
# ------------------------------------------------------------

DROP TABLE IF EXISTS `form_options_profession`;

CREATE TABLE `form_options_profession` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

LOCK TABLES `form_options_profession` WRITE;
/*!40000 ALTER TABLE `form_options_profession` DISABLE KEYS */;

INSERT INTO `form_options_profession` (`id`, `value`)
VALUES
	(1,'Professional Musician'),
	(2,'Amateur Musician'),
	(3,'Weekend Warrior');

/*!40000 ALTER TABLE `form_options_profession` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table form_options_travel
# ------------------------------------------------------------

DROP TABLE IF EXISTS `form_options_travel`;

CREATE TABLE `form_options_travel` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

LOCK TABLES `form_options_travel` WRITE;
/*!40000 ALTER TABLE `form_options_travel` DISABLE KEYS */;

INSERT INTO `form_options_travel` (`id`, `value`)
VALUES
	(1,'Anywhere'),
	(2,'Within the US'),
	(3,'Within my state'),
	(4,'Within my city');

/*!40000 ALTER TABLE `form_options_travel` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table form_options_vocals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `form_options_vocals`;

CREATE TABLE `form_options_vocals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

LOCK TABLES `form_options_vocals` WRITE;
/*!40000 ALTER TABLE `form_options_vocals` DISABLE KEYS */;

INSERT INTO `form_options_vocals` (`id`, `value`)
VALUES
	(4,'Male Baritone Register'),
	(5,'Male Tenor Register'),
	(6,'Female Alto Register');

/*!40000 ALTER TABLE `form_options_vocals` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table profiles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `profiles`;

CREATE TABLE `profiles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT '',
  `last_name` varchar(255) DEFAULT '',
  `availability` varchar(255) DEFAULT '',
  `city` varchar(255) DEFAULT '',
  `profession` varchar(255) DEFAULT '',
  `state` varchar(255) DEFAULT '',
  `travel` varchar(255) DEFAULT '',
  `profile_views` int(11) NOT NULL DEFAULT '0',
  `profile_picture` varchar(255) DEFAULT NULL,
  `instruments` varchar(255) DEFAULT '',
  `vocals` varchar(255) DEFAULT '',
  `genres` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;

INSERT INTO `profiles` (`id`, `first_name`, `last_name`, `availability`, `city`, `profession`, `state`, `travel`, `profile_views`, `profile_picture`, `instruments`, `vocals`, `genres`)
VALUES
	(54,'Rick','Shea','[\"Weekend Nights\"]','Denver','Amateur Musician','CO','Within my state',0,'','[\"Guitar\",\"Electronic Drum Set\"]','[\"Male Baritone Register\",\"Male Tenor Register\"]','[\"Rock\",\"Bluegrass\"]');

/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(120) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `password`, `username`)
VALUES
	(33,'nosbig22','rhenley@sovrn.com'),
	(46,'nosbig22','rdfhenley@sovrn.com'),
	(47,'nosbig22','rhenlesdfasdf@sovrn.com');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
