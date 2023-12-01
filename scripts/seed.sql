/*
you can execute this script with this commmand: 
psql -U <username> -d <database> -f <file>
 */

INSERT INTO users (username, password)
VALUES
  ('Alice', '$2b$10$DKmsc6Eu6XRrH12.lfDXtOpwJCjv2PY/yeF.JFvq7mYmGxkxHexYy'),
  ('Bob', '$2b$10$gUAEPvIII84sUhj5GLdNIenaWOO7dGaMcYYKwa7dRRKLAdMBRtXsu'),
  ('Carol', '$2b$10$264n.YkC22xkurkkt7rrH.VnWQHJGd2xWGxYd7hIIvSn36n2oiHFe'),
  ('David', '$2b$10$iV4QX6gxN5r2thZRVMawLuoIkSdlQS1hylSupdGXzCftcP0NhfE6y'),
  ('Eve', '$2b$10$rLP5JS6qlQ6u1EnxbhuSMe4dxesn2A11tW/V7BFv73ZKKSirKrYEW'),
  ('Frank', '$2b$10$7SDyD77lhVgzq81P.itBTuI8TN0cuF27sKnORN2x4boaBgMZkEI2e'),
  ('Grace', '$2b$10$8yprbs6QksbUeRGGIqHIge2CGH0ulZFzMgPl7dQ8Ez0KxVmjB0ww.'),
  ('Harry', '$2b$10$XU8O2.V86SIeL6KD/lCqqOGRLaihJcM94k9Yy1AnJQxXnkuv07JqG'),
  ('Irene', '$2b$10$Uo.576WqbP7l7zcHr2SN7./Dw/iEq9HyZ/7wGVh/pifGSCviyu6Sq'),
  ('Quinn', '$2b$10$d/fCrQl3RBSV7BaSJDq0yel0X2lCoNgo5fpmhxdvPbscek8BKUcNO');

INSERT INTO roles (role_id, name)
VALUES
  (0, 'suspended'),
  (1, 'user'),
  (2, 'admin');

INSERT INTO users_roles (user_id, role_id)
VALUES
  (1, 1),
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1),
  (6, 1),
  (7, 1),
  (8, 1),
  (9, 1),
  (10, 1);

INSERT INTO sessions (user_id, uuid, expires_at)
VALUES
  (1, 'b531c4e2-3459-4e83-955c-942f71d52133', '2023-10-15 08:43:46.562+00'),
  (2, 'b531c4e2-3459-4e83-955c-942f71d52134', '2023-10-16 08:43:46.562+00'),
  (3, 'b531c4e2-3459-4e83-955c-942f71d52135', '2023-10-17 08:43:46.562+00'),
  (4, 'b531c4e2-3459-4e83-955c-942f71d52136', '2023-10-18 08:43:46.562+00'),
  (5, 'b531c4e2-3459-4e83-955c-942f71d52137', '2023-10-19 08:43:46.562+00');

INSERT INTO archive_parts (winner, loser, duration_ms, date)
VALUES
  (1, 2, 120000, CURRENT_TIMESTAMP),
  (3, 2, 90000, CURRENT_TIMESTAMP + INTERVAL '2' DAY),
  (4, 5, 12245, CURRENT_TIMESTAMP + INTERVAL '3' DAY),
  (3, 1, 45784, CURRENT_TIMESTAMP + INTERVAL '4' DAY),
  (2, 3, 45784, CURRENT_TIMESTAMP + INTERVAL '5' DAY);
