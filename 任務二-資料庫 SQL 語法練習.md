# 任務二 - 任務二-資料庫 SQL 語法練習

## 作業1 - 拯救明華國小的資料庫，哪個欄位適合變成外來鍵？

```sql

-- 創建 class 資料表
CREATE DATABASE IF NOT EXISTS `testdb` DEFAULT CHARACTER SET utf8;
USE `testdb`;
DROP TABLE `testdb`.`class`, `testdb`.`student`;

-- 創建 class 資料表
CREATE TABLE class(
	id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

-- 創建 student 資料表
-- 並把 student(classes_id)設為FK 與 class(id) PK 做連接
CREATE TABLE student(
id serial PRIMARY KEY,
name VARCHAR(30),
gender VARCHAR(5),
age INTEGER,
class_id BIGINT UNSIGNED,
FOREIGN KEY(class_id) REFERENCES class(id)
);

INSERT INTO  class(name)VALUES
('三年一班'),
('三年二班');

INSERT INTO student(name,gender,age,class_id)VALUES
('小明','男',8,1),
('小華','女',9,2),
('小美','男',8,1),
('小強','女',8,1),
('小智','男',9,2);

SELECT
s.id AS '學生編號',
s.name AS '學生姓名',
c.name AS '班級',
s.gender AS '性別',
s.age AS '年齡'
FROM student s
JOIN class c ON c.id = s.class_id
ORDER BY s.id;

```

## 作業2 - 第一題的延伸，多了一個班級老師

```sql

CREATE DATABASE IF NOT EXISTS `testdb` DEFAULT CHARACTER SET utf8;
USE `testdb`;
DROP TABLE `testdb`.`class`, `testdb`.`student`;
-- 創建 class 資料表
CREATE TABLE class(
	id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    teacher VARCHAR(30)
);

-- 創建 student 資料表
-- 並把 student(class_id)設為FK 與 class(id) PK 做連接
CREATE TABLE student(
id serial PRIMARY KEY,
name VARCHAR(30),
gender VARCHAR(5),
age INTEGER,
class_id BIGINT UNSIGNED,
FOREIGN KEY(class_id) REFERENCES class(id)
);

INSERT INTO  class(name,teacher)VALUES
('三年一班','廖洧杰'),
('三年二班','卡斯伯');

INSERT INTO student(name,gender,age,class_id)VALUES
('小明','男',8,1),
('小華','女',9,2),
('小美','男',8,1),
('小強','女',8,1),
('小智','男',9,2);


SELECT
s.id AS '學生編號',
s.name AS '學生姓名',
c.name AS '班級',
c.teacher AS '班級老師',
s.gender AS '性別',
s.age AS '年齡'
FROM student s
JOIN class c ON c.id = s.class_id
ORDER BY s.id;

```

## 作業3 - 小孩的家庭歸類資料庫，父母資料一直重複實在討厭！

```sql

CREATE DATABASE IF NOT EXISTS `testdb` DEFAULT CHARACTER SET utf8;
USE `testdb`;
DROP TABLE `testdb`.`class`, `testdb`.`student`, `testdb`.`parent`;


-- 創建 class 資料表
CREATE TABLE class(
	id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    teacher VARCHAR(30)
);

-- 創建 parent 資料表
CREATE TABLE parent(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    tel VARCHAR(20),
    gender VARCHAR(5)
);

-- 創建 student 資料表
-- 把 student(class_id)設為FK 與 class(id) PK 做連接
-- 把 student(parent_id)設為FK 與 parent(id) PK 做連接
CREATE TABLE student(
id serial PRIMARY KEY,
name VARCHAR(30),
gender VARCHAR(5),
age INTEGER,
class_id BIGINT UNSIGNED,
parent_id BIGINT UNSIGNED,
FOREIGN KEY(class_id) REFERENCES class(id),
FOREIGN KEY(parent_id) REFERENCES parent(id)
);

INSERT INTO  class(name,teacher)VALUES
('三年一班','廖洧杰'),
('三年二班','卡斯伯');


INSERT INTO parent(name,tel,gender)VALUES
('王大祥','0973254254','男'),
('王曉如','0955717855','女');


INSERT INTO student(name,gender,age,class_id,parent_id)VALUES
('小明','男',8,1,1),
('小華','女',9,2,2),
('小美','男',8,1,1),
('小強','女',8,1,2),
('小智','男',9,2,1);


SELECT
s.id AS '小孩編號',
s.name AS '姓名',
p.name AS '父母名稱',
p.tel AS '父母電話',
p.gender AS '父母性別'
FROM student s
JOIN parent p ON p.id =  s.parent_id
ORDER BY s.id;


```
