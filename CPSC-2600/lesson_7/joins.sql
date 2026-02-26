--Wil write queries--

--set--
.mode box


--just printing the authored table--
SELECT * FROM authored; 

--Get the name of the author insted of the author id--
--Need to get data from a third table--

SELECT books.title, authors.name, authored.author_id AS "Author ID", book_id AS "Book ID" FROM books
JOIN authored ON books.id = authored.book_id
JOIN authors ON authors.id = authored.author_id;