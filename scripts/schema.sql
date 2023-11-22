/*
you can execute this script with this commmand: 
psql -U <username> -d <database> -f <file>
 */

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS sessions (
  session_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  uuid VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS admins (
  user_id INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS archive_parts (
    part_id SERIAL,
    winner SERIAL,
    loser SERIAL,
    duration_ms BIGINT,
    date TIMESTAMPTZ,
    CONSTRAINT pk_archive_parts PRIMARY KEY (part_id),
    CONSTRAINT fk_archive_parts_users_winner FOREIGN KEY (winner) REFERENCES users(user_id),
    CONSTRAINT fk_archive_parts_Users_loser FOREIGN KEY (loser) REFERENCES users(user_id),
    CONSTRAINT archive_parts_participants CHECK (winner != loser),
    CONSTRAINT archive_parts_duration CHECK (duration_ms > 0)
);
