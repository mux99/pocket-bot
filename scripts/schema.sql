/*
you can execute this script with this commmand: 
psql -U <username> -d <database> -f <file>
 */
CREATE TABLE
  IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS friend_requests (
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    sent_on TIMESTAMPTZ NOT NULL,
    is_confirmed BOOLEAN NOT NULL DEFAULT 'no',
    PRIMARY KEY (sender_id, receiver_id),
    FOREIGN KEY (sender_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT friend_requests_users CHECK (sender_id != receiver_id)
  );

CREATE TABLE
  IF NOT EXISTS friends (
    user_id_1 INT NOT NULL,
    user_id_2 INT NOT NULL,
    PRIMARY KEY (user_id_1, user_id_2),
    FOREIGN KEY (user_id_1) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_2) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT friends_users CHECK (user_id_1 != user_id_2)
  );

CREATE TABLE
  IF NOT EXISTS admins (
    user_id INT NOT NULL PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS archive_parts (
    part_id SERIAL,
    winner SERIAL,
    loser SERIAL,
    duration_ms BIGINT,
    date TIMESTAMPTZ,
    CONSTRAINT pk_archive_parts PRIMARY KEY (part_id),
    CONSTRAINT fk_archive_parts_users_winner FOREIGN KEY (winner) REFERENCES users (user_id),
    CONSTRAINT fk_archive_parts_Users_loser FOREIGN KEY (loser) REFERENCES users (user_id),
    CONSTRAINT archive_parts_participants CHECK (winner != loser),
    CONSTRAINT archive_parts_duration CHECK (duration_ms > 0)
  );

CREATE TABLE
  IF NOT EXISTS user_statistics (
    user_statistics_id SERIAL,
    user_id INT NOT NULL,
    win_lose_ratio DECIMAL(5, 2),
    total_games INT NOT NULL DEFAULT 0,
    total_wins INT NOT NULL DEFAULT 0,
    total_losses INT NOT NULL DEFAULT 0,
    average_game_duration_s BIGINT,
    total_duration_s BIGINT,
    PRIMARY KEY (user_statistics_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
  );