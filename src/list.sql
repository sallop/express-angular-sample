/*
SET NAMES 'utf8';
SET CHARACTER SET 'utf8';
SHOW CHARACTER SET;
SHOW COLLATION;
*/

CREATE TABLE list
(
	id INTEGER(3),
	team INTEGER(2),
	fullname VARCHAR(64),
	christian_name VARCHAR(64),
	birthday DATE,
	telephone VARCHAR(64),
	postcode VARCHAR(64),
	address VARCHAR(64)
);

INSERT INTO list (id, team, fullname, christian_name, birthday, telephone, postcode, address) VALUES 
(303, 11, '古X誠司', 'M.コルペ', '1962/07/18', '0XXX-X5-0851', '891-0203', '喜入町XXXX-3'),
(304,  9, '古木X子', 'アンナ', '1949/07/26', 'XX4-1566', '891-0103', '皇徳寺台XXXXX5'),
(305, 11, '国X啓子', 'クリスチナ', '1926/07/18', 'XX8-1807', '892-2706', '入佐町XXX4'),
(306,  6, '小X戸秀子', 'ベルナデッタ', '1955/05/28', '269-XXX6', '891-0143', '和田XXXX15'),
(307,  6, '小XX子', 'マリア', '1941/05/23', '2XX-XX20', '891-0143', '谷山中央XXXXXX-9'),
(308,  6, '小X晋', 'ジェラルド', '1973/09/06', '2XX-3XX0', '891-0143', '谷山中央XXXXXX-9'),
(309,  7, '児XX美', 'マリア', '1963/01/03', '26X-5XX9', '891-0142', '和田町XXXX17');

