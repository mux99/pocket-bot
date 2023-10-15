/*
you can execute this script with this commmand: 
psql -U <username> -d <database> -f <file>
 */

INSERT INTO users ( username, password)
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