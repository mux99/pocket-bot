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

CREATE TABLE IF NOT EXISTS roles (
  role_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS users_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  CONSTRAINT pk_users_roles PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sessions (
  session_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  uuid VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS friend_requests (
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    sent_on TIMESTAMPTZ NOT NULL,
    is_confirmed BOOLEAN NOT NULL DEFAULT 'no',
    PRIMARY KEY (sender_id, receiver_id),
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT friend_requests_users CHECK (sender_id != receiver_id)
);

CREATE TABLE IF NOT EXISTS friends (
    user_id_1 INT NOT NULL,
    user_id_2 INT NOT NULL,
    PRIMARY KEY (user_id_1, user_id_2),
    FOREIGN KEY (user_id_1) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_2) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT friends_users CHECK (user_id_1 != user_id_2)
);

CREATE TABLE IF NOT EXISTS archive_parts (
    part_id SERIAL,
    winner SERIAL,
    loser SERIAL,
    duration_ms BIGINT,
    date TIMESTAMPTZ,
    CONSTRAINT pk_archive_parts PRIMARY KEY (part_id),
    CONSTRAINT fk_archive_parts_users_winner FOREIGN KEY (winner) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_archive_parts_Users_loser FOREIGN KEY (loser) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT archive_parts_participants CHECK (winner != loser),
    CONSTRAINT archive_parts_duration CHECK (duration_ms > 0)
);

CREATE TABLE IF NOT EXISTS part_proposal (
    requester_id INT,
    opponent_id INT,
    accepted BOOLEAN NULL DEFAULT NULL,
    CONSTRAINT pk_part_proposal PRIMARY KEY (requester_id),
    CONSTRAINT fk_part_proposal_requester FOREIGN KEY (requester_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_part_proposal_participant FOREIGN KEY (opponent_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT part_proposal_requester_participant CHECK (requester_id != opponent_id)
);

CREATE TABLE IF NOT EXISTS parts(
    player1 INT,
    player2 INT,
    loser INT DEFAULT NULL,
    time_start TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_parts PRIMARY KEY (player1),
    CONSTRAINT uq_player UNIQUE (player2),
    CONSTRAINT fk_parts_player1 FOREIGN KEY (player1) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_parts_player2 FOREIGN KEY (player2) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT parts_players CHECK (player1 != player2),
    CONSTRAINT check_winner CHECK (loser IN (player1, player2))
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id SERIAL,
    receiver_id INT,
    type VARCHAR(10),
    sender_id INT NULL,
    seen BOOLEAN DEFAULT FALSE,
    CONSTRAINT pk_notifications PRIMARY KEY (notification_id),
    CONSTRAINT fk_notifications_receiver FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_notifications_sender FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT receiver_sender CHECK (receiver_id != sender_id)
);
