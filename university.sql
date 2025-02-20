-- MySQL dump 10.13  Distrib 8.2.0, for macos13 (arm64)
--
-- Host: localhost    Database: university
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin` (
  `username` char(15) NOT NULL,
  `university_id` int NOT NULL,
  PRIMARY KEY (`username`),
  KEY `university_id` (`university_id`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `University` (`id`),
  CONSTRAINT `admin_ibfk_2` FOREIGN KEY (`username`) REFERENCES `User` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `Commented`
--

DROP TABLE IF EXISTS `Commented`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Commented` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `student_username` char(15) NOT NULL,
  `text` char(250) DEFAULT NULL,
  `timestamp` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `student_username` (`student_username`),
  CONSTRAINT `commented_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event` (`id`),
  CONSTRAINT `commented_ibfk_2` FOREIGN KEY (`student_username`) REFERENCES `Student` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location_id` int NOT NULL,
  `category_id` int NOT NULL,
  `contact_username` char(15) NOT NULL,
  `name` char(15) DEFAULT NULL,
  `timestamp` bigint DEFAULT NULL,
  `description` char(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `timestamp` (`timestamp`),
  KEY `location_id` (`location_id`),
  KEY `category_id` (`category_id`),
  KEY `contact_username` (`contact_username`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`),
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Event_Category` (`id`),
  CONSTRAINT `event_ibfk_3` FOREIGN KEY (`contact_username`) REFERENCES `User` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Event_Category`
--

DROP TABLE IF EXISTS `Event_Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event_Category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(15) DEFAULT NULL,
  `latitude` float(20,14) DEFAULT NULL,
  `longitude` float(20,14) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Participates`
--

DROP TABLE IF EXISTS `Participates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Participates` (
  `rso_id` int NOT NULL,
  `student_username` char(15) NOT NULL,
  PRIMARY KEY (`rso_id`,`student_username`),
  KEY `student_username` (`student_username`),
  CONSTRAINT `participates_ibfk_1` FOREIGN KEY (`rso_id`) REFERENCES `RSO` (`id`),
  CONSTRAINT `participates_ibfk_2` FOREIGN KEY (`student_username`) REFERENCES `Student` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `RSO_Status_Update_Join` AFTER INSERT ON `participates` FOR EACH ROW BEGIN
    IF(
        (SELECT COUNT(*) 
        FROM Participates M
        WHERE M.rso_id = NEW.rso_id) > 4)
    THEN
        UPDATE RSO
        SET status='active'
        WHERE id = NEW.rso_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `RSO_Status_Update_Leave` AFTER DELETE ON `participates` FOR EACH ROW BEGIN
    IF(
        (SELECT COUNT(*) 
        FROM Participates M
        WHERE M.rso_id = OLD.rso_id) < 5)
    THEN
        UPDATE RSO
        SET status='inact'
        WHERE id = OLD.rso_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Pending_Admin`
--

DROP TABLE IF EXISTS `Pending_Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pending_Admin` (
  `username` char(15) NOT NULL,
  `university_id` int NOT NULL,
  PRIMARY KEY (`username`),
  KEY `university_id` (`university_id`),
  CONSTRAINT `pending_admin_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `University` (`id`),
  CONSTRAINT `pending_admin_ibfk_2` FOREIGN KEY (`username`) REFERENCES `User` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Pending_Event`
--

DROP TABLE IF EXISTS `Pending_Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pending_Event` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `pending_event_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `Pending_Event` WRITE;
/*!40000 ALTER TABLE `Pending_Event` DISABLE KEYS */;
INSERT INTO `Pending_Event` VALUES (44),(48),(58);
/*!40000 ALTER TABLE `Pending_Event` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Pending_Event_Subclass_Events` AFTER INSERT ON `pending_event` FOR EACH ROW BEGIN
    IF NOT EXISTS (SELECT * FROM Event T WHERE NEW.id = T.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Pending_Event_Disjointness` AFTER INSERT ON `pending_event` FOR EACH ROW BEGIN
    IF 
    EXISTS (SELECT * FROM RSO_Event A WHERE NEW.id = A.id) OR 
    EXISTS (SELECT * FROM Public_Event B WHERE NEW.id = B.id) OR
    EXISTS (SELECT * FROM Private_Event C WHERE NEW.id = C.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Private_Event`
--

DROP TABLE IF EXISTS `Private_Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Private_Event` (
  `id` int NOT NULL,
  `university_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `university_id` (`university_id`),
  CONSTRAINT `private_event_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `University` (`id`),
  CONSTRAINT `private_event_ibfk_2` FOREIGN KEY (`id`) REFERENCES `Event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Private_Event_Subclass_Events` AFTER INSERT ON `private_event` FOR EACH ROW BEGIN
    IF NOT EXISTS (SELECT * FROM Event T WHERE NEW.id = T.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Private_Event_Disjointness` AFTER INSERT ON `private_event` FOR EACH ROW BEGIN
    IF 
    EXISTS (SELECT * FROM RSO_Event A WHERE NEW.id = A.id) OR 
    EXISTS (SELECT * FROM Pending_Event B WHERE NEW.id = B.id) OR
    EXISTS (SELECT * FROM Public_Event C WHERE NEW.id = C.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Public_Event`
--

DROP TABLE IF EXISTS `Public_Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Public_Event` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `public_event_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Public_Event_Subclass_Events` AFTER INSERT ON `public_event` FOR EACH ROW BEGIN
    IF NOT EXISTS (SELECT * FROM Event T WHERE NEW.id = T.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Public_Event_Disjointness` AFTER INSERT ON `public_event` FOR EACH ROW BEGIN
    IF 
    EXISTS (SELECT * FROM RSO_Event A WHERE NEW.id = A.id) OR 
    EXISTS (SELECT * FROM Pending_Event B WHERE NEW.id = B.id) OR
    EXISTS (SELECT * FROM Private_Event C WHERE NEW.id = C.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Rated`
--

DROP TABLE IF EXISTS `Rated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rated` (
  `event_id` int NOT NULL,
  `student_username` char(15) NOT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`event_id`,`student_username`),
  KEY `student_username` (`student_username`),
  CONSTRAINT `rated_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event` (`id`),
  CONSTRAINT `rated_ibfk_2` FOREIGN KEY (`student_username`) REFERENCES `Student` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `RSO`
--

DROP TABLE IF EXISTS `RSO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RSO` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_username` char(15) NOT NULL,
  `name` char(15) DEFAULT NULL,
  `status` char(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_username` (`owner_username`),
  CONSTRAINT `rso_ibfk_1` FOREIGN KEY (`owner_username`) REFERENCES `Admin` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `RSO` WRITE;
/*!40000 ALTER TABLE `RSO` DISABLE KEYS */;
INSERT INTO `RSO` VALUES (1,'john','CS Club','inact'),(2,'kurt','Chess Club','inact'),(3,'kurt','Robotics Club','active'),(25,'kurt','Workout Club','active'),(33,'kurt','Basketball Club','inact'),(34,'max123','Reading Club','inact'),(35,'max123','Gaming Club','active'),(36,'max2001','Checkers','active'),(37,'max2002','TEST RSO','inact');
/*!40000 ALTER TABLE `RSO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RSO_Event`
--

DROP TABLE IF EXISTS `RSO_Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RSO_Event` (
  `id` int NOT NULL,
  `rso_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rso_id` (`rso_id`),
  CONSTRAINT `rso_event_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Event` (`id`),
  CONSTRAINT `rso_event_ibfk_2` FOREIGN KEY (`rso_id`) REFERENCES `RSO` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `RSO_Event_Subclass_Events` AFTER INSERT ON `rso_event` FOR EACH ROW BEGIN
    IF NOT EXISTS (SELECT * FROM Event T WHERE NEW.id = T.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `RSO_Event_Disjointness` AFTER INSERT ON `rso_event` FOR EACH ROW BEGIN
    IF 
    EXISTS (SELECT * FROM Private_Event A WHERE NEW.id = A.id) OR 
    EXISTS (SELECT * FROM Pending_Event B WHERE NEW.id = B.id) OR
    EXISTS (SELECT * FROM Public_Event C WHERE NEW.id = C.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Saved`
--

DROP TABLE IF EXISTS `Saved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Saved` (
  `event_id` int NOT NULL,
  `student_username` char(15) NOT NULL,
  PRIMARY KEY (`event_id`,`student_username`),
  KEY `student_username` (`student_username`),
  CONSTRAINT `saved_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event` (`id`),
  CONSTRAINT `saved_ibfk_2` FOREIGN KEY (`student_username`) REFERENCES `Student` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student` (
  `username` char(15) NOT NULL,
  `university_id` int NOT NULL,
  PRIMARY KEY (`username`),
  KEY `university_id` (`university_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `University` (`id`),
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`username`) REFERENCES `User` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Super_Admin`
--

DROP TABLE IF EXISTS `Super_Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Super_Admin` (
  `username` char(15) NOT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `super_admin_ibfk_1` FOREIGN KEY (`username`) REFERENCES `User` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `University`
--

DROP TABLE IF EXISTS `University`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `University` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `username` char(15) NOT NULL,
  `password` char(60) DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `firstname` char(15) DEFAULT NULL,
  `lastname` char(15) DEFAULT NULL,
  `email` char(30) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-18  4:37:07
