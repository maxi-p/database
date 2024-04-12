DROP DATABASE university;
CREATE DATABASE university;

USE university;

CREATE TABLE University(
    id INT AUTO_INCREMENT,
    name CHAR(15),
    PRIMARY KEY (id)
);

CREATE TABLE User(
    username CHAR(15),
    password CHAR(60),
    phone CHAR(10),
    firstname CHAR(15),
    lastname CHAR(15),
    email CHAR(30),
    PRIMARY KEY (username)
);

CREATE TABLE Super_Admin(
    username CHAR(15),
    PRIMARY KEY (username),
    FOREIGN KEY (username) REFERENCES User (username)
);

CREATE TABLE Admin(
    username CHAR(15),
    university_id INT NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (university_id) REFERENCES University (id),
    FOREIGN KEY (username) REFERENCES User (username)
);

CREATE TABLE Pending_Admin(
    username CHAR(15),
    university_id INT NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (university_id) REFERENCES University (id),
    FOREIGN KEY (username) REFERENCES User (username)
);

CREATE TABLE Student(
    username CHAR(15),
    university_id INT NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (university_id) REFERENCES University (id),
    FOREIGN KEY (username) REFERENCES User (username)
);

CREATE TABLE Location(
    id INT AUTO_INCREMENT,
    name CHAR(15),
    latitude FLOAT(20,14),
    longitude FLOAT(20,14),
    PRIMARY KEY (id)
);

CREATE TABLE Event_Category(
    id INT AUTO_INCREMENT,
    name CHAR(15),
    PRIMARY KEY (id)
);

CREATE TABLE RSO(
    id INT AUTO_INCREMENT,
    owner_username CHAR(15) NOT NULL,
    name CHAR(15),
    status CHAR(6),
    PRIMARY KEY (id),
    FOREIGN KEY (owner_username) REFERENCES Admin (username)
);

CREATE TABLE Event(
    id INT AUTO_INCREMENT,
    location_id INT NOT NULL,
    category_id INT NOT NULL,
    contact_username CHAR(15) NOT NULL,
    name CHAR(15),
    timestamp BIGINT UNIQUE,
    description CHAR(250),
    PRIMARY KEY (id),
    FOREIGN KEY (location_id) REFERENCES Location (id),
    FOREIGN KEY (category_id) REFERENCES Event_Category (id),
    FOREIGN KEY (contact_username) REFERENCES User (username)
);

CREATE TABLE RSO_Event(
    id INT,
    rso_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES Event (id),
    FOREIGN KEY (rso_id) REFERENCES RSO (id)
);

CREATE TABLE Private_Event(
    id INT,
    university_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (university_id) REFERENCES University (id),
    FOREIGN KEY (id) REFERENCES Event (id)
);

CREATE TABLE Pending_Event(
    id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES Event (id)
);

CREATE TABLE Public_Event(
    id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES Event (id)
);

CREATE TABLE Participates(
    rso_id INT,
    student_username CHAR(15),
    PRIMARY KEY (rso_id,student_username),
    FOREIGN KEY (rso_id) REFERENCES RSO (id),
    FOREIGN KEY (student_username) REFERENCES Student (username)
);

CREATE TABLE Saved(
    event_id INT,
    student_username CHAR(15),
    PRIMARY KEY (event_id,student_username),
    FOREIGN KEY (event_id) REFERENCES Event (id),
    FOREIGN KEY (student_username) REFERENCES Student (username)
);

CREATE TABLE Rated(
    event_id INT,
    student_username CHAR(15),
    score INT,
    PRIMARY KEY (event_id,student_username),
    FOREIGN KEY (event_id) REFERENCES Event (id),
    FOREIGN KEY (student_username) REFERENCES Student (username)
);

CREATE TABLE Commented(
    id INT AUTO_INCREMENT,
    event_id INT NOT NULL,
    student_username CHAR(15) NOT NULL,
    text CHAR(250),
    timestamp BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (event_id) REFERENCES Event (id),
    FOREIGN KEY (student_username) REFERENCES Student (username)
);

DELIMITER $$
CREATE TRIGGER RSO_Event_Subclass_Events
AFTER INSERT ON RSO_Event FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT * FROM Event T WHERE NEW.id = T.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER Public_Event_Subclass_Events
AFTER INSERT ON Public_Event FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT * FROM Event T WHERE NEW.id = T.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER Private_Event_Subclass_Events
AFTER INSERT ON Private_Event FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT * FROM Event T WHERE NEW.id = T.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END; $$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER Pending_Event_Subclass_Events
AFTER INSERT ON Pending_Event FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT * FROM Event T WHERE NEW.id = T.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER Pending_Event_Disjointness
AFTER INSERT ON Pending_Event FOR EACH ROW
BEGIN
    IF 
    EXISTS (SELECT * FROM RSO_Event A WHERE NEW.id = A.id) OR 
    EXISTS (SELECT * FROM Public_Event B WHERE NEW.id = B.id) OR
    EXISTS (SELECT * FROM Private_Event C WHERE NEW.id = C.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER Public_Event_Disjointness
AFTER INSERT ON Public_Event FOR EACH ROW
BEGIN
    IF 
    EXISTS (SELECT * FROM RSO_Event A WHERE NEW.id = A.id) OR 
    EXISTS (SELECT * FROM Pending_Event B WHERE NEW.id = B.id) OR
    EXISTS (SELECT * FROM Private_Event C WHERE NEW.id = C.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER Private_Event_Disjointness
AFTER INSERT ON Private_Event FOR EACH ROW
BEGIN
    IF 
    EXISTS (SELECT * FROM RSO_Event A WHERE NEW.id = A.id) OR 
    EXISTS (SELECT * FROM Pending_Event B WHERE NEW.id = B.id) OR
    EXISTS (SELECT * FROM Public_Event C WHERE NEW.id = C.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER RSO_Event_Disjointness
AFTER INSERT ON RSO_Event FOR EACH ROW
BEGIN
    IF 
    EXISTS (SELECT * FROM Private_Event A WHERE NEW.id = A.id) OR 
    EXISTS (SELECT * FROM Pending_Event B WHERE NEW.id = B.id) OR
    EXISTS (SELECT * FROM Public_Event C WHERE NEW.id = C.id)
    THEN SIGNAL SQLSTATE '45000';
END IF;
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER RSO_Status_Update_Join
AFTER INSERT ON Participates FOR EACH ROW 
BEGIN
    IF(
        (SELECT COUNT(*) 
        FROM Participates M
        WHERE M.rso_id = NEW.rso_id) > 4)
    THEN
        UPDATE RSO
        SET status='active'
        WHERE id = NEW.rso_id;
    END IF;
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER RSO_Status_Update_Leave
AFTER DELETE ON Participates FOR EACH ROW 
BEGIN
    IF(
        (SELECT COUNT(*) 
        FROM Participates M
        WHERE M.rso_id = OLD.rso_id) < 5)
    THEN
        UPDATE RSO
        SET status='inact'
        WHERE id = OLD.rso_id;
    END IF;
END; $$
DELIMITER ;

INSERT INTO 
University ( name )
VALUES ('UCF'),('USF');

INSERT INTO 
User (username, firstname, lastname, email, password, phone)
VALUES  ('kurt', 'Kurt', 'Smith', 'ks@usf.edu', 'asd','111'),
        ('john', 'John', 'Smith', 'js@usf.edu', 'asd','111'),
        ('sam', 'Sam', 'Smith', 'ss@ucf.edu', 'asd','111'),
        ('stepen', 'Stephen', 'Smith', 'ss@ucf.edu', 'asd','111'),
        ('dennis', 'Dennis', 'Smith', 'ds@ucf.edu', 'asd','111'),
        ('alan', 'Alan', 'Smith', 'as@ucf.edu', 'asd','111'),
        ('james', 'James', 'Smith', 'jd@ucf.edu', 'asd','111'),
        ('chris', 'Chris', 'Smith', 'cs@ucf.edu', 'asd','111'),
        ('doug', 'Doug', 'Smith', 'ds@ucf.edu', 'asd','111'),
        ('max', 'Max', 'Smith', 'ms@ucf.edu', 'asd','111');

INSERT INTO
Super_Admin (username)
VALUES ('max');

INSERT INTO 
Admin (username, university_id)
VALUES  ('kurt',1),
        ('john',1);

INSERT INTO 
Student (username, university_id)
VALUES  ('sam',1),
        ('stepen',1),
        ('dennis',1),
        ('alan',1),
        ('james',1),
        ('chris',1),
        ('doug',1),
        ('max',1),
        ('kurt',1),
        ('john',1);

INSERT INTO
Location (name, latitude, longitude)
VALUES  ('Student Union', 28.60193221158939, -81.20048441204149),
        ('Egr 2', 28.60187947278022, -81.19874344654455);

INSERT INTO
Event_Category (name)
VALUES ('social'),('fundraising'),('tech talk');

INSERT INTO 
RSO (owner_username, name, status)
VALUES  ('john', 'CS Club', 'inact'),
        ('kurt', 'Chess Club', 'inact'),
        ('kurt', 'Robotics Club', 'inact');


INSERT INTO
Event (location_id, category_id, contact_username, name, timestamp, description)
VALUES  (2, 3, 'dennis', 'C Programming', 1712851200, 'A lecture on introduction to C programming by Dennis'),
        (1, 1, 'max', 'Welcome Session', 1712847600, 'Welcome meeting for the CS Club'),
        (1, 1, 'chris', 'Chess Blitz', 1712844000, 'Chess Blitz tournament ages 18-22'),
        (1, 3, 'doug', 'Study Session', 1712840400, 'Study session of the robotics class'),
        (1, 1, 'dennis', 'Pizza event', 1712862000, 'Pizza party'),
        (1, 3, 'dennis', 'SD1 ceremony', 1712775600, 'Senior Design ceremony'),
        (2, 3, 'kurt', 'SD1 showcase', 1712750400, 'Senior Design showcase'),
        (1, 3, 'dennis', 'Chess Rapid', 1712941200, 'Chess Rapid tournament ages 18-22'),
        (2, 3, 'stepen', 'OOP session', 1712952000, 'Object oriented programming session'),
        (1, 3, 'dennis', 'CIS session', 1712959200, 'Cyber security session'),
        (2, 3, 'james', 'Backend', 1713045600, 'Backend learning session'),
        (1, 3, 'dennis', 'Databases', 1713013200, 'Databases session'),
        (1, 3, 'dennis', 'DSA session', 1713020400, 'Algoritms and datastructure session'),
        (2, 3, 'dennis', 'FE review', 1712674800, 'Foundation Exam review'),
        (1, 3, 'dennis', 'COP4710 exam', 1712588400, 'COP 4710 Exam review session'),
        (2, 3, 'alan', 'discrete str', 1712610000, 'Discrete structures review session'),
        (1, 3, 'dennis', 'graduation', 1713628800, 'Graduation ceremony'),
        (2, 3, 'dennis', 'robotics show', 1713193200, 'Robotics showcase'),
        (1, 2, 'dennis', 'fundraising', 1713366000, 'Foundraising event'),
        (2, 3, 'dennis', 'hacking event', 1713625200, 'Hacking competition');

INSERT INTO
RSO_Event (id, rso_id)
VALUES  (1, 1),
        (9, 1),
        (10, 1),
        (11, 1),
        (12, 1),
        (13, 1),
        (14, 1),
        (15, 1),
        (16, 1),
        (20, 1);

INSERT INTO
Private_Event (id, university_id)
VALUES  (2, 1),
        (5, 1),
        (6, 1),
        (7, 1),
        (17, 1),
        (19, 1);

INSERT INTO
Public_Event (id)
VALUES  (18);

INSERT INTO 
Participates (rso_id, student_username)
VALUES  (1, 'john'),
        (1, 'dennis'),
        (1, 'alan'),
        (1, 'max');


INSERT INTO 
Participates (rso_id, student_username)
VALUES  (1, 'stepen');

INSERT INTO 
Saved (event_id, student_username)
VALUES  (20, 'dennis'),
        (18, 'dennis');

INSERT INTO 
Rated (event_id, student_username, score)
VALUES  (20, 'dennis', 5),
        (18, 'dennis', 5);

INSERT INTO 
Commented (event_id, student_username, text, timestamp)
VALUES  (18, 'dennis', 'I am definitely going',1712806102);