DROP TABLE IF EXISTS cities;
CREATE TABLE cities(id serial PRIMARY KEY, name VARCHAR(255), population integer);

DROP TABLE IF EXISTS calendarevents;
CREATE TABLE calendarevents(id serial PRIMARY KEY, start TIMESTAMP, "end" TIMESTAMP, title VARCHAR(255), "allday" BOOLEAN, draggable BOOLEAN);