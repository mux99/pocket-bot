/*
you can execute this script with this commmand: 
psql -U <username> -d <database> -f <file>
 */
INSERT INTO
  users (username, password)
VALUES
  (
    'Alice',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvq7mYmGxkxHexYy'
  ),
  (
    'Bob',
    '$2b$10$gUAEPvIII84sUhj5GLdNIenaWOO7dGaMcYYKwa7dRRKLAdMBRtXsu'
  ),
  (
    'Carol',
    '$2b$10$264n.YkC22xkurkkt7rrH.VnWQHJGd2xWGxYd7hIIvSn36n2oiHFe'
  ),
  (
    'David',
    '$2b$10$iV4QX6gxN5r2thZRVMawLuoIkSdlQS1hylSupdGXzCftcP0NhfE6y'
  ),
  (
    'Eve',
    '$2b$10$rLP5JS6qlQ6u1EnxbhuSMe4dxesn2A11tW/V7BFv73ZKKSirKrYEW'
  ),
  (
    'Frank',
    '$2b$10$7SDyD77lhVgzq81P.itBTuI8TN0cuF27sKnORN2x4boaBgMZkEI2e'
  ),
  (
    'Grace',
    '$2b$10$8yprbs6QksbUeRGGIqHIge2CGH0ulZFzMgPl7dQ8Ez0KxVmjB0ww.'
  ),
  (
    'Harry',
    '$2b$10$XU8O2.V86SIeL6KD/lCqqOGRLaihJcM94k9Yy1AnJQxXnkuv07JqG'
  ),
  (
    'Irene',
    '$2b$10$Uo.576WqbP7l7zcHr2SN7./Dw/iEq9HyZ/7wGVh/pifGSCviyu6Sq'
  ),
  (
    'Quinn',
    '$2b$10$d/fCrQl3RBSV7BaSJDq0yel0X2lCoNgo5fpmhxdvPbscek8BKUcNO'
  ),
  (
    'Jack',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjvgPY/yeF.JFvq7mYmGxkxHexYq'
  ),
  (
    'Katie',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvq7mamGxkxHexYw'
  ),
  (
    'Laura',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvq7mqmGxkxHexYe'
  ),
  (
    'Mike',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvq7mYzGxkxHexYr'
  ),
  (
    'Nancy',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvq7mYmGxyxHexYt'
  ),
  (
    'Oliver',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvq7mYmGxkkHexYt'
  ),
  (
    'Patricia',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFbq7mYmGxkxHexYt'
  ),
  (
    'Quentin',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvqamYmGxkxHexY'
  ),
  (
    'Rachel',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvq7mgmGxkxHexYy'
  ),
  (
    'Steve',
    '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvq7mYmGxkxdexYy'
  );

INSERT INTO
  sessions (user_id, uuid, expires_at)
VALUES
  (
    1,
    'b531c4e2-3459-4e83-955c-942f71d52133',
    '2023-10-15 08:43:46.562+00'
  ),
  (
    2,
    'b531c4e2-3459-4e83-955c-942f71d52134',
    '2023-10-16 08:43:46.562+00'
  ),
  (
    3,
    'b531c4e2-3459-4e83-955c-942f71d52135',
    '2023-10-17 08:43:46.562+00'
  ),
  (
    4,
    'b531c4e2-3459-4e83-955c-942f71d52136',
    '2023-10-18 08:43:46.562+00'
  ),
  (
    5,
    'b531c4e2-3459-4e83-955c-942f71d52137',
    '2023-10-19 08:43:46.562+00'
  );

INSERT INTO
  admins (user_id)
VALUES
  (1);

INSERT INTO
  archive_parts (winner, loser, duration_ms, date)
VALUES
  (1, 2, 120000, CURRENT_TIMESTAMP),
  (3, 2, 90000, CURRENT_TIMESTAMP + INTERVAL '2' DAY),
  (4, 5, 12245, CURRENT_TIMESTAMP + INTERVAL '3' DAY),
  (3, 1, 45784, CURRENT_TIMESTAMP + INTERVAL '4' DAY),
  (2, 3, 45784, CURRENT_TIMESTAMP + INTERVAL '5' DAY);

INSERT INTO
  user_statistics (
    user_id,
    win_lose_ratio,
    total_games,
    total_wins,
    total_losses,
    average_game_duration_s,
    total_duration_s
  )
VALUES
  (1, 0.51, 20, 10, 10, 300, 6000),
  (2, 0.60, 30, 18, 12, 350, 10500),
  (3, 0.70, 40, 28, 12, 400, 16000),
  (4, 0.80, 50, 40, 10, 320, 16000),
  (5, 0.90, 60, 54, 6, 360, 21600),
  (6, 0.75, 80, 60, 20, 380, 30400),
  (7, 0.65, 100, 65, 35, 400, 40000),
  (8, 0.55, 120, 66, 54, 350, 42000),
  (9, 0.45, 140, 63, 77, 400, 56000),
  (10, 0.35, 160, 56, 104, 360, 57600),
  (11, 0.51, 20, 10, 10, 300, 6000),
  (12, 0.60, 30, 18, 12, 350, 10500),
  (13, 0.70, 40, 28, 12, 400, 16000),
  (14, 0.80, 50, 40, 10, 320, 16000),
  (15, 0.90, 60, 54, 6, 360, 21600),
  (16, 0.75, 80, 60, 20, 380, 30400),
  (17, 0.65, 100, 65, 35, 400, 40000),
  (18, 0.55, 120, 66, 54, 350, 42000),
  (19, 0.45, 140, 63, 77, 400, 56000),
  (20, 0.35, 160, 56, 104, 360, 57600);
