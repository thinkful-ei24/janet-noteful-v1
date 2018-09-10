SELECT * FROM notes;
SELECT * FROM notes LIMIT 5;
SELECT id, title, created FROM notes ORDER by id ASC;
SELECT id, title, created FROM notes ORDER by title ASC;
SELECT * FROM notes WHERE title = '';
SELECT * FROM notes WHERE title LIKE '';

UPDATE notes
SET title = 'New Title'
WHERE id = 1 RETURNING *;

INSERT INTO notes
(title, content)
VALUES ('   ', 'ansdfja') RETURNING *;


DELETE FROM note WHERE id =1 RETURNING *;