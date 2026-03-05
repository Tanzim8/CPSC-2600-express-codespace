DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews(
    id INTEGER PRIMARY KEY,
    reviewer TEXT NOT NULL,
    rating INTEGER NOT NULL 
        CONSTRAINT rating_range CHECK (rating >= 0 AND rating <= 5),
    book_id INTEGER NOT NULL REFERENCES books(id),
    COMMENT TEXT
)