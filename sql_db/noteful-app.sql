--psql -U dev -d noteful-app -f ./noteful-app.sql

SELECT CURRENT_DATE;
DROP TABLE IF EXISTS notes;

SELECT CURRENT_DATE;

CREATE TABLE notes (
    id serial PRIMARY KEY,
    title text NOT NULL,
    content text,
    created TIMESTAMP DEFAULT CURRENT_DATE
);

INSERT INTO notes 
    (title, content)
    VALUES ('Hello', 'Testing row');

    INSERT INTO notes 
    (title, content)
    VALUES ('Goodbye', 'Testing');

