CREATE TABLE IF NOT EXISTS Account (ID TEXT PRIMARY KEY, MAIL TEXT, PASS TEXT);
CREATE TABLE IF NOT EXISTS Character (ID TEXT PRIMARY KEY, NAME TEXT, Account TEXT, INFO_PRIVATE BLOB, INFO_PUBLIC);
CREATE TABLE IF NOT EXISTS Team (ID TEXT PRIMARY KEY, NAME TEXT, INFO_PRIVATE BLOB, INFO_PUBLIC);

select * from sqlite_master