CREATE TABLE IF NOT EXISTS Account (ID TEXT PRIMARY KEY, MAIL TEXT, PASS TEXT);
CREATE TABLE IF NOT EXISTS Character (ID TEXT PRIMARY KEY, NAME TEXT, ACCOUNT TEXT, INFO_PRIVATE BLOB, INFO_PUBLIC BLOB);
CREATE TABLE IF NOT EXISTS Team(ID TEXT PRIMARY KEY, NAME TEXT, LEADER TEXT, MEMBER BLOB, APPROACH BLOB, INVENTORY BLOB, LOG BLOB);
CREATE TABLE IF NOT EXISTS Enemy (ID TEXT PRIMARY KEY, NAME TEXT, INFO BLOB);
CREATE TABLE IF NOT EXISTS Area (ID TEXT PRIMARY KEY, LENGTH INTEGER, EVENT_RANDOM BLOB, EVENT_FIX BLOB);
CREATE TABLE IF NOT EXISTS Event (ID TEXT PRIMARY KEY, TYPE INTEGER, CONTENTS BLOB);

SELECT * FROM Account;
SELECT * FROM Character;
SELECT * FROM Team;
SELECT * FROM Enemy;
SELECT * FROM Area;
SELECT * FROM Event;

select * from sqlite_master;