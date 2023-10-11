/*
you can execute this script with this commmand: 
psql -U <username> -d <database> -f <file>
 */

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL
);
