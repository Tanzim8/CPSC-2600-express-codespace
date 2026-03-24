-- Drop and rebuild the table (all data will be erased)
DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    type        TEXT NOT NULL,
    age         INTEGER NOT NULL
);

-- Insert test data 
INSERT INTO pets (name, type, age) VALUES
('Fluffy', 'dog', 3),
('Bowser', 'dog', 9),
('Clarence', 'cat', 4),
('Beaker', 'parrot', 22);