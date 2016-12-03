-- dev
CREATE DATABASE `db-p2p`;
CREATE USER 'p2p-admin'@'localhost' IDENTIFIED BY '*';
GRANT ALL PRIVILEGES ON `db-p2p`.* TO 'p2p-admin'@'localhost';
SET PASSWORD FOR 'p2p-admin'@'localhost' = PASSWORD('*');

-- prod
CREATE DATABASE `p2p`;
CREATE USER 'p2p_user'@'localhost' IDENTIFIED BY '*';
GRANT ALL PRIVILEGES ON `p2p`.* TO 'p2p_user'@'localhost';
SET PASSWORD FOR 'p2p_user'@'localhost' = PASSWORD('*');

