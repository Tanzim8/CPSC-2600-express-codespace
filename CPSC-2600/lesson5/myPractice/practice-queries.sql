-- Get all books
SELECT * FROM books;
-- Get all authors but only name and country
SELECT name, country FROM authors;
-- If we want to narrow down the rows of each table that are selected, we can use the WHERE statement to add conditions 
-- Only authors from Japan 
-- Strings in SQL always use single quotes. (Double quotes have a special meaning)
SELECT name, country FROM authors WHERE country='Japan';
-- Only authors born after 1980 or during 1980 
SELECT name, country, birth FROM authors WHERE birth>=1980;
-- Only authors from France or Spain
SELECT name, country FROM authors WHERE country='France' OR country='Spain';
-- CHALLENGE: Get all authors born during the 1980s
SELECT name, country, birth FROM authors WHERE birth>=1980 AND birth<1990;
-- Sort by birth year
SELECT name, country, birth FROM authors WHERE birth>=1980 AND birth<1990 ORDER BY birth ASC;
-- Descending order
SELECT name, country, birth FROM authors WHERE birth>=1980 AND birth<1990 ORDER BY birth DESC;
-- If we want to get only a subset of the rows that match our query 
SELECT name, country, birth FROM authors WHERE birth>=1980 AND birth<1990 ORDER BY birth DESC LIMIT 4;
-- Skip the first 2
SELECT name, country, birth FROM authors WHERE birth>=1980 AND birth<1990 ORDER BY birth DESC LIMIT 4 OFFSET 2;
-- CHALLENGE: Get the title, date published, and number of pages from all paperback books with more than 300 pages. They should be sorted alphabeticaly by title in descending order, and only 10 should be displayed
SELECT title, published, pages, format FROM books 
WHERE format='paperback' AND pages > 300 
ORDER BY title DESC 
LIMIT 10;

-- Inserting new data into the database 
-- Insert three new authors
INSERT INTO authors (name, country, birth) VALUES
('Jordan', 'Canada', 1980),
('Corneluis', 'USA', 1978),
('Bartholemew', 'Mexico', 1988);
-- If the Primary Key has INTEGER data type, we don't need to set it manually, SQLite will automatically set it to a unique value for each new row that's inserted
-- Warning: every time you run this script, the above three authors will be inserted.

-- Delete from a database 
-- Be careful, this is permanent 
DELETE FROM authors WHERE name='Corneluis';

-- BREAK UNTIL 5:40