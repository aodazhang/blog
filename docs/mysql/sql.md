---
lang: zh-CN
title: SQL 语法
# sidebar: auto
---

## 1.规范

### 书写

- **大写英文**：语句、函数
- **小写英文**：数据库名、表名、列名（采用蛇形命名）

### 引号

- **不使用**：MySQL 默认识别为列名
- **单引号**：字符串
- **双引号**：在 ANSI_QUOTES 模式下另有它用
- **反引号**：列名和 MySQL 关键字冲突时使用

### 命名

- **Camel Case 驼峰**：第一个单词首字母小写，其他单词首字母大写 `userLogin`
- **Pascal Case 帕斯卡**：所有单词首字母大写 `UserLogin`
- **Snake Case 蛇形**：所有单词字母小写并用下划线连接 `user_login`
- **Kebab Case 串形**：所有单词字母小写并用中划线连接 `user-login`

## 2.数据库

### 查询数据库

```sql
# 1.查询当前数据库列表
# 语法
SHOW DATABASES;
```

### 切换数据库

```sql
# 1.切换当前数据库
# 语法
USE 数据库名;
# 示例
USE demo;
```

### 创建数据库

```sql
# 1.创建数据库（存在会报错）
# 语法
CREATE DATABASE 数据库名;
# 示例
CREATE DATABASE demo;

# 2.创建数据库（判断是否不存在，不存在则创建）
# 语法
CREATE DATABASE IF NOT EXISTS 数据库名;
# 示例
CREATE DATABASE IF NOT EXISTS demo;
```

### 删除数据库

```sql
# 1.删除数据库（不存在会报错）
# 语法
DROP DATABASE 数据库名;
# 示例
DROP DATABASE demo;

# 2.删除数据库（判断是否存在，存在则删除）
# 语法
DROP DATABASE IF EXISTS 数据库名;
# 示例
DROP DATABASE IF EXISTS demo;
```

## 3.表

### 查询表

```sql
# 1.查询所有表和视图（当前数据库）
# 语法
SHOW TABLES;

# 2.查询所有表和视图（指定数据库）
# 语法
SHOW TABLES FROM 数据库名;
# 示例
SHOW TABLES FROM demo;

# 3.查询表结构（表格形式）
# 语法
DESCRIBE 表名;
DESC 表名;
EXPLAIN 表名;
SHOW COLUMNS FROM 表名;
SHOW FIELDS FROM 表名;
# 示例
DESCRIBE student_info;
DESC student_info;
EXPLAIN student_info;
SHOW COLUMNS FROM student_info;
SHOW FIELDS FROM student_info;

# 4.查询表结构（行形式）
# 语法
SHOW CREATE TABLE 表名;
SHOW CREATE TABLE 数据库名.表名;
# 示例
SHOW CREATE TABLE student_info;
SHOW CREATE TABLE demo.student_info;
```

### 创建表

```sql
# 1.创建表（判断是否不存在，不存在则创建）
# 语法
# PRIMARY KEY：主键，仅有一个，不能重复，可多个列组合，自带 NOT NULL，有索引
# UNIQUE KEY：候选键，可有多个，不能重复，可多个列组合，可设置 DEFAULT NULL，有索引
# CONSTRAINT FOREIGN KEY：外键，子表列关联父表列，子表列值必须在父表列值存在才能增改，父表列必须建立索引
# AUTO_INCREMENT：自增，限整数或浮点数，常用于主键，仅有一个，设置后 DEFAULT 无效，必须建立索引
# ZEROFILL：补0，限无符号整数
# NOT NULL：不允许为空，设置后 DEFAULT NULL 无效
# DEFAULT：列默认值，设置后默认为 NULL
# CURRENT_TIMESTAMP：当前时间戳，等价于 NOW()
# COMMENT：列注释
# `xxx`：用于列名和 MySQL 关键字冲突的情况
CREATE TABLE IF NOT EXISTS 表名 (
	列名1	数据类型 [属性],
	列名2	数据类型 [属性],
  ...
) [属性];

# 示例
CREATE TABLE IF NOT EXISTS student_info (
  # 主键写法1（单列）
	number INT ZEROFILL PRIMARY KEY COMMENT '学号',
	`name` VARCHAR(5) NOT NULL COMMENT '姓名',
	sex ENUM('男', '女') DEFAULT '男' COMMENT '性别',
	# 候选键写法1（单列）
	id_number CHAR(18) UNIQUE KEY DEFAULT NULL COMMENT '身份证号',
	department VARCHAR(30) COMMENT '学院',
	major VARCHAR(30) COMMENT '专业',
	enrollment_time DATE COMMENT '入学时间'
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COMMENT '学生基本信息表';
CREATE TABLE IF NOT EXISTS student_score (
	number INT ZEROFILL COMMENT '学号',
	`subject` VARCHAR(30) COMMENT '科目',
	score TINYINT COMMENT '成绩',
	# 主键写法2（多列）
	PRIMARY KEY (number, `subject`),
	# 候选键写法2（设定约束名称 + 多列）
	UNIQUE KEY `约束名称` (number, score),
	# 外键写法：CONSTRAINT [外键名称] FOREIGN KEY(列名1, 列名2, ...) REFERENCES 父表名(列名1, 列名2, ...)
	CONSTRAINT 外键名称 FOREIGN KEY(number) REFERENCES student_info(number)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COMMENT '学生成绩表';
CREATE TABLE IF NOT EXISTS student_test (
	number INT COMMENT '学号',
	create_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	update_at DATETIME DEFAULT NOW() COMMENT '更新时间'
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COMMENT '测试表';

# 2.创建列
# 语法
ALTER TABLE 表名 ADD [COLUMN] 列名 数据类型 [属性] [列序] [指定列名];
# 示例
ALTER TABLE student_info ADD test1 CHAR(4); # 添加到最后一列
ALTER TABLE student_info ADD COLUMN test2 CHAR(4) FIRST; # 添加到第一列
ALTER TABLE student_info ADD COLUMN test3 CHAR(4) AFTER test2; # 添加到第一列
```

### 修改表

```sql
# 1.修改表（同数据库修改，跨数据库转移）
# 语法
ALTER TABLE 旧表名 RENAME TO 新表名;
ALTER TABLE 旧数据库名.旧表名 RENAME TO 新数据库名.新表名;
# 示例
ALTER TABLE student_info RENAME TO student_info1;
ALTER TABLE demo.student_info1 RENAME TO java_wiki.student_info1;

# 2.修改表（同数据库修改，跨数据库转移）
# 语法
RENAME TABLE 旧数据库名.旧表名1 TO 新数据库名.新表名1, 旧表名2 TO 新表名2;
# 示例
RENAME TABLE java_wiki.student_info1 TO demo.student_info1, student_info1 TO student_info;

# 3.修改列（不改列名，修改前后的数据类型和属性要兼容）
# 语法
ALTER TABLE 表名 MODIFY 列名 新数据类型 [新属性] [列序] [指定列名];
# 示例
ALTER TABLE student_info MODIFY test1 TINYINT FIRST;
ALTER TABLE student_info MODIFY test3 TINYINT COMMENT 'test3' AFTER test1;

# 4.修改列（改列名，修改前后的数据类型和属性要兼容）
# 语法
ALTER TABLE 表名 CHANGE 旧列名 新列名 新数据类型 [新属性] [列序] [指定列名];
# 示例
ALTER TABLE student_info CHANGE test2 test4 CHAR(4) COMMENT 'test4' FIRST;

# 5.修改列（多操作）
# 语法
ALTER TABLE 表名 操作 1, 操作 2;
# 示例
ALTER TABLE student_info
  MODIFY test1 TINYINT COMMENT 'test1' FIRST,
  CHANGE test4 test2 TINYINT COMMENT 'test2' AFTER test1,
  MODIFY test3 TINYINT COMMENT 'test3' AFTER test2;
```

### 删除表

```sql
# 1.删除表（不存在会报错）
# 语法
DROP TABLE 表名1, 表名2;
# 示例
DROP TABLE student_info, student_score;

# 2.删除表（判断是否存在，存在则删除）
# 语法
DROP TABLE IF EXISTS 表名1, 表名2;
# 示例
DROP TABLE IF EXISTS student_info, student_score;

# 3.删除列
# 语法
ALTER TABLE 表名 DROP [COLUMN] 列名;
# 示例
ALTER TABLE student_info DROP test1;
ALTER TABLE student_info DROP COLUMN test2;
ALTER TABLE student_info DROP COLUMN test3;
```

## 4.键

### 主键

```sql
# 设置单列主键
`id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '数据id'
# 设置多列合并主键
PRIMARY KEY (`id`, `name`)
```

### 候选键

```sql
# 设置单列候选键
`name` VARCHAR(255) UNIQUE KEY NOT NULL COMMENT '名称'
`create_at` DATETIME UNIQUE KEY DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
`update_at` DATETIME UNIQUE KEY DEFAULT NOW() COMMENT '更新时间'
# 设置多列合并候选键
UNIQUE KEY `合并候选键名称` (`name`, `create_at`)
```

### 外键

子表列关联父表列，被关联的父表列必须建立索引，子表外键字段必须在父表列存在才能增改

```sql
# 设置单列外键
CONSTRAINT 外键名称 FOREIGN KEY(`test_id`) REFERENCES test(`id`) ON UPDATE CASCADE ON DELETE CASCADE
# 设置多列合并外键
CONSTRAINT 外键名称 FOREIGN KEY(`test_id`, `test_name`) REFERENCES test(`id`, `name`) ON UPDATE CASCADE ON DELETE CASCADE
```

##### 时机

- **`ON UPDATE`**：父表删除记录时
- **`ON DELETE`**：父表更新记录时

##### 行为（父表删除、更新记录时检查是否有对应外键）

- **`CASCADE`**：若存在则同时删除在子表中关联记录 或 更新在子表中关联记录的外键字段
- **`NO ACTION`**：若存在则不允许操作（与 `RESTRICT` 一致）
- **`RESTRICT`**：若存在则不允许操作（与 `NO ACTION` 一致）
- **`DEFAULT`**：若存在则同时设置在子表中关联记录的外键字段为默认值（INNODB 不支持）
- **`SET NULL`**：若存在则同时设置在子表中关联记录的外键字段为 NULL（外键字段需允许为 NULL）

### 对比

| 类型   | 单表唯一 | 值不重复 | 索引 | 可多列组合 | 默认 NOT NULL | 可关联父表 |
| :----- | :------- | :------- | :--- | :--------- | :------------ | :--------- |
| 主键   | ✅       | ✅       | ✅   | ✅         | ✅            | ❌         |
| 候选键 | ❌       | ✅       | ✅   | ✅         | ❌            | ❌         |
| 外键   | ❌       | ❌       | ✅   | ✅         | ❌            | ✅         |

## 5.记录

### 查询记录（单表）

```sql
# 核心语法执行顺序
# 1.JOIN 连接驱动表和被驱动表
# 2.ON 对被驱动表过滤，保留符合条件的记录（内链接与 WHERE 等价，在 WHERE 前过滤；外链接不同）
# 3.WHERE 对记录过滤，保留符合条件的记录
# 4.GROUP BY 对记录分组
# 5.HAVING 对分组过滤，保留符合条件的分组（在 WHERE 后过滤）
# 6.ORDER BY 对记录排序
# 7.LIMIT 对记录收敛
SELECT [DISTINCT] 查询列 [FROM 表名]
  [JOIN 连接表] [ON 连接过滤条件]
  [WHERE 普通过滤条件]
  [GROUP BY 分组列] [HAVING 分组过滤条件]
  [ORDER BY 排序]
  [LIMIT 开始行, 限制行数];
```

```sql
# 1.查询单表（全量列：不推荐，降低性能）
# 语法
SELECT * FROM 表名;
# 示例
SELECT * FROM student_info;

# 2.查询单表（指定列：按指定列顺序输出，允许重复列名）
# 语法
SELECT 列名1 别名1, 列名2 [AS] 别名2, 列名3 FROM 表名;
# 示例
SELECT `name` 姓名, `name`, number AS 学号, sex FROM student_info;

# 3.查询单表（去重）
# 语法
SELECT DISTINCT 列名1, 列名2 FROM 表名;
# 示例
SELECT DISTINCT department FROM student_info; # 去重一列数据
SELECT DISTINCT department, major FROM student_info; # 去重多列数据

# 4.查询单表（限制数量：LIMIT 必须放在 ORDER BY 后面）
# 语法
SELECT 列名1, 列名2 FROM 表名 LIMIT 限制行数;
SELECT 列名1, 列名2 FROM 表名 LIMIT 开始行, 限制行数;
SELECT 列名1, 列名2 FROM 表名 LIMIT 限制行数 OFFSET 开始行;
# 示例
SELECT `name`, number, sex FROM student_info LIMIT 3; # 查询0~2
SELECT `name`, number, sex FROM student_info LIMIT 2, 3; # 查询2~4

# 5.查询单表（排序：默认 ASC 升序，LIMIT 必须放在 ORDER BY 后面）
# 语法
SELECT 列名1, 列名2 FROM 表名 ORDER BY 列名 ASC|DESC;
SELECT 列名1, 列名2 FROM 表名 ORDER BY 列名1 ASC|DESC, 列名2 ASC|DESC;
# 示例
SELECT number, `subject`, score FROM student_score ORDER BY score DESC; # score 降序
SELECT number, `subject`, score FROM student_score ORDER BY `subject`, score DESC; # 先 subject 升序，再 score 降序

# 6.查询单表（搜索条件）
# 语法
# =：等于
# <>、!=：不等于
# <、<=、>、>=：小于、小于等于、大于、大于等于
# a BETWEEN b AND c、a NOT BETWEEN b AND c：符合 b <= a <= c、不符合 b <= a <= c
# a IN (b, c)、a NOT IN (b, c)：a 是列表中某一项、a 不是列表中某一项
# a IS NULL、a IS NOT NULL：a 为空、a 不为空。注意不能使用普通操作符直接与 null 值比较
# AND、OR、XOR：且、或、一真。注意 AND 优先级高于 OR
# a LIKE b、a NOT LIKE b：a 模糊匹配 b、a 模糊不匹配 b
  # '杜%' -> 通配符，匹配杜开头的字符串
  # '%杜%' -> 通配符，匹配包含杜的字符串
  # '杜_' -> 通配符，匹配杜开头的2个字符的字符串
  # '杜\%'、'杜\_' -> 转义通配符，匹配字符串中本身含有%、_
SELECT 列名1, 列名2 FROM 表名 WHERE 搜索条件;
# 示例
SELECT number, `name`, major FROM student_info WHERE `name` = '范剑'; # 查询姓名等于 范剑
SELECT number, `name`, major FROM student_info WHERE major != '软件工程'; # 查询专业不等于 软件工程
SELECT number, `name`, major FROM student_info WHERE number > 20180103; # 查询学号大于 20180103
SELECT number, `name`, major FROM student_info WHERE number BETWEEN 20180102 AND 20180104; # 查询学号符合 20180102<=学号<=20180104
SELECT number, `name`, major FROM student_info WHERE number NOT BETWEEN 20180102 AND 20180104; # 查询学号不符合 20180102<=学号<=20180104
SELECT number, `name`, major FROM student_info WHERE major IN ('软件工程', '飞行器设计'); # 查询专业是 软件工程、飞行器设计
SELECT number, `name`, major FROM student_info WHERE major NOT IN ('软件工程', '飞行器设计'); # 查询专业不是 软件工程、飞行器设计
SELECT number, `name`, major FROM student_info WHERE `name` IS NULL; # 查询姓名 为空
SELECT number, `name`, major FROM student_info WHERE `name` IS NOT NULL; # 查询姓名 不为空
SELECT number, `name`, major FROM student_info
	WHERE number > 20180103 AND major = '软件工程'; # 查询 学号大于20180103 且 专业为软件工程
SELECT number, `name`, major FROM student_info
	WHERE (number, major) = (20180103, '软件工程'); # 查询 学号为20180103 且 专业为软件工程
SELECT number, `name`, major FROM student_info
	WHERE number > 20180103 OR major = '软件工程'; # 查询 学号大于20180103 或 专业为软件工程
SELECT number, `name`, major FROM student_info
	WHERE number > 20180103 XOR major = '软件工程'; # 查询 学号大于20180103 或 专业为软件工程 有一个为真
SELECT number, `subject`, score FROM student_score
	WHERE score > 95 OR score < 55 AND `subject` = '论萨达姆的战争准备'; # 查询 score > 95 或 (score < 95 且 subject = '论萨达姆的战争准备')
SELECT number, `name`, major FROM student_info WHERE `name` LIKE '范%'; # 查询姓名以 范 开头
SELECT number, `name`, major FROM student_info WHERE `name` LIKE '范_'; # 查询姓名以 范 开头的两字符

# 7.查询单表（分组）
# 语法
# 非分组列不应出现在查询列中
# GROUP BY 必须放在 WHERE 之后、ORDER BY 之前
# 如果分组列中含有 NULL，那么 NULL 也会作为一个独立的分组存在
# 嵌套分组时统计函数只作用于最后的分组列
# WHERE 在分组前过滤，作用于每条记录，WHERE 过滤掉的记录将不包括在分组中
# HAVING 在分组后过滤，作用于所有分组
SELECT 列名1, 列名2 FROM 表名 GROUP BY 分组列名1, 分组列名2;
# 示例
SELECT `subject`, AVG(score) FROM student_score
	GROUP BY `subject`; # a.根据 subject 的值分组 b.每组分别对 score 求平均值
SELECT `subject`, AVG(score) FROM student_score
	WHERE score >= 60
	GROUP BY `subject`; # a.查询 score >= 60 b.根据 subject 的值分组 c.每组分别对 score 求平均值
SELECT `subject`, AVG(score) FROM student_score
	GROUP BY `subject` HAVING AVG(score) > 73; # a.根据 subject 的值分组 b.过滤掉平均值 <= 73 的分组 c.每组分别对 score 求平均值
SELECT `subject`, AVG(score) avg_score FROM student_score
	GROUP BY `subject` ORDER BY avg_score DESC; # a.根据 subject 的值分组 b.每组分别对 score 求平均值 c.根据平均值降序
SELECT department, major, COUNT(*) `count`FROM student_info
	GROUP BY department, major; # a.根据 department 分组 b.根据 major 继续嵌套分组 c.每组分别计算记录数
```

### 查询记录（子查询）

```sql
# 1.查询多表（标量子查询：子查询结果是单列单值）
# 语法
# 子查询的结果可以作为主查询的列或搜索条件
# 子查询必须使用 () 包裹
# EXISTS (子查询)：子查询结果不是空为真
# NOT EXISTS (子查询)：子查询结果是空为真
# 示例
SELECT (SELECT number FROM student_info WHERE name = '杜琦燕') 学号; # a.查询 student_info 中杜琦燕的学号 b.利用学号作为列
SELECT * FROM student_score
	WHERE number = (SELECT number FROM student_info WHERE `name` = '杜琦燕'); # a.查询 student_info 中杜琦燕的学号 b.利用学号作为搜索条件查询 student_score 中杜琦燕的各科成绩
SELECT * FROM student_score
	WHERE EXISTS (SELECT number FROM student_info WHERE `name` = '杜琦燕'); # a.查询 student_info 中杜琦燕的学号 b.学号存在则查询 student_score
SELECT * FROM student_score
	WHERE NOT EXISTS (SELECT number FROM student_info WHERE `name` = '杜琦燕'); # a.查询 student_info 中杜琦燕的学号 b.学号不存在则查询 student_score

# 2.查询多表（列子查询：子查询结果是单列多值）
# 示例
SELECT * FROM student_score
	WHERE number IN (SELECT number FROM student_info WHERE major = '计算机科学与工程'); # a.查询 student_info 中专业的学号 b.利用学号作为搜索条件查询 student_score 中每个学号的各科成绩

# 3.查询多表（行子查询：子查询结果是多列单值）
# 示例
SELECT * FROM student_score
	WHERE (number, `subject`) = (SELECT number, '论萨达姆的战争准备' FROM student_info LIMIT 1); # a.查询 student_info 学号、科目 b.利用学号、科目作为搜索条件查询 student_score 中指定学号的各科成绩

# 4.查询多表（表子查询：子查询结果是多列多值）
# 示例
SELECT * FROM student_score
	WHERE (number, `subject`) IN (SELECT number, '论萨达姆的战争准备' FROM student_info); # a.查询 student_info 学号、科目 b.利用学号、科目作为搜索条件查询 student_score 中每个学号的各科成绩

# 5.查询多表（相关子查询：子查询需要使用主查询的值）
# 示例
SELECT number, `name`, major FROM student_info
	WHERE EXISTS (SELECT * FROM student_score WHERE student_score.number = student_info.number); # a.查询 student_info 记录 b.将学号传入子查询判断 student_score 中是否存在，存在则添加该记录到结果集

# 6.查询多表（同表子查询：子查询和主查询使用同一张表）
# 示例
SELECT * FROM student_score
	WHERE `subject` = '母猪的产后护理' AND score > (SELECT AVG(score) FROM student_score WHERE `subject` = '母猪的产后护理'); # a.查询 student_score 指定科目的平均分 b.根据科目、平均分查询 student_score
```

### 查询记录（连接查询）

```sql
# 1.连接多表（内连接：驱动表匹配不到被驱动表的记录，不会加入结果集）
# 语法
# 分表原则：同表是否浪费存储空间、同表是否涉及多处信息修改
# 连接概念：将多表记录取出依次匹配成新的结果集，该结果集称为笛卡尔积，记录数 = 表1行数 * 表2行数
  # 驱动表：作为结果集的主表
  # 被驱动表：匹配主表的从表
# 连接与子查询的区别：子查询的结果只当作中间结果来使用，最终还是主查询的结果集
SELECT * FROM 表名1, 表名2;
SELECT 表名1.*, 表名2.* FROM 表名1, 表名2;
SELECT 列名1, 列名2, 列名3, 列名4 FROM 表名1, 表名2;
SELECT 表名1.列名1, 表名1.列名2, 表名2.列名1, 表名2.列名2 FROM 表名1, 表名2;
SELECT * FROM 表名1 [INNER | CROSS] JOIN 表名2 [ON 内连接条件] [WHERE 普通过滤条件];
SELECT * FROM 表名1 INNER JOIN 表名2 [ON 内连接条件] INNER JOIN 表名3 [ON 内连接条件] [WHERE 普通过滤条件];
# 示例
SELECT t1.*, t2.* FROM student_info t1, student_score t2; # 内连接 student_info 和 student_score 表，共6*8=48条记录
SELECT t1.*, t2.* FROM student_info t1, student_score t2
	WHERE t1.number < 0020180103 AND t1.number = t2.number; # a.在驱动表 t1 中过滤学号 b.到被驱动表 t2 中匹配学号相同的记录进行连接

# 2.连接多表（外连接：驱动表匹配不到被驱动表的记录，也会加入结果集）
# 语法
# 左外连接：左侧的表做为驱动表
# 右外连接：右侧的表做为驱动表
# WHERE 和 ON 惯例：单表查询和子查询的搜索条件使用 WHERE、连接查询的连接条件使用 ON
  # WHERE：不符合搜索条件的不会加入结果集
  # ON：连接条件，针对被驱动表，在内链接中与 WHERE 等价；在外连接中如果被驱动表不符合连接条件也会加入结果集，但会用 NULL 填充
SELECT * FROM 表1 LEFT [OUTER] JOIN 表2 ON 左连接过滤条件 [WHERE 普通过滤条件]; # 驱动表：表1、被驱动表：表2
SELECT * FROM 表1 RIGHT [OUTER] JOIN 表2 ON 右连接过滤条件 [WHERE 普通过滤条件]; # 驱动表：表2、被驱动表：表1
# 示例
SELECT * FROM student_info t1
	LEFT JOIN student_score t2 ON t1.number = t2.number; # a.到被驱动表 t2 中匹配学号相同的记录进行连接
SELECT t2.*, t1.* FROM student_info t1
	RIGHT JOIN student_score t2 ON t1.number = t2.number; # a.到被驱动表 t1 中匹配学号相同的记录进行连接

# 3.连接多表（自连接：同一张表作为驱动表和被驱动表进行匹配）
# 语法
SELECT * FROM 表名1 as 别名1, 表名1 as 别名2;
# 示例
SELECT * FROM student_info AS t1
	INNER JOIN student_info AS t2
	WHERE t1.major = t2.major AND t1.`name` = '史珍香'; # a.到被驱动表 t2 中匹配专业、姓名进行连接
```

### 查询记录（组合查询）

```sql
# 1.组合查询
# 语法
# 结果集列名以第一个语句的列名为准
# UNION：或，过滤重复数据，使用 UNION 连接的语中各个列数据类型必须一一对应，如果不是 MySQL 会自动转换数据类型
# UNION ALL：或，不过滤重复数据
# ORDER BY、LIMIT 对最终结果集生效，同时 ORDER BY 以第一个语句的列名为准
语句1 UNION 语句2 UNION 语句3
语句1 UNION ALL 语句2
# 示例
SELECT number, `name`, major FROM student_info WHERE number < 0020180102
	UNION SELECT number, `name`, major FROM student_info WHERE number > 0020180104; # 查询 student_info 表学号 + 查询 student_info 表学号
SELECT number FROM student_info WHERE number < 0020180102
	UNION SELECT number FROM student_score; # 查询 student_info 表学号 + 查询 student_score 表学号
```

### 新增记录

```sql
# 1.新增记录（普通）
# 语法
# 列名和值是一一对应的，可以与表中列顺序不同
# 可以忽略设置的前提：未设置 NOT NULL、设置 DEFAULT，可以主动设置 NULL
# IGNORE：忽略插入重复数据会触发 PRIMARY KEY、UNIQUE KEY 的异常校验，如果重复则不新增
# ON DUPLICATE KEY UPDATE：忽略插入重复数据会触发 PRIMARY KEY、UNIQUE KEY 的异常校验，如果重复则更新
# VALUES(列)：获取新增数据中指定列的值
INSERT [IGNORE] INTO 表名(列名1, 列名2) VALUES (值1，值2), (值1，值2) [ON DUPLICATE KEY UPDATE 更新语句];
# 示例
INSERT INTO student_score(number, `subject`, score) VALUES
	(20180101, '母猪的产后护理', 78),
	(20180102, '论萨达姆的战争准备', 100); # 批量新增 student_score 记录
INSERT IGNORE INTO student_score(number, `subject`, score) VALUES
	(20180104, '母猪的产后护理', 55),
	(20180104, '论萨达姆的战争准备', 46); # 批量新增 student_score 记录，触发 PRIMARY KEY、UNIQUE KEY 则不新增
INSERT IGNORE INTO student_score(number, `subject`, score) VALUES
	(20180104, '母猪的产后护理', 55),
	(20180104, '论萨达姆的战争准备', 46)
	ON DUPLICATE KEY UPDATE `subject` = '统一更新的科目名'; # 批量新增 student_score 记录，触发 PRIMARY KEY、UNIQUE KEY 则使用指定数据更新
INSERT IGNORE INTO student_score(number, `subject`, score) VALUES
	(20180104, '母猪的产后护理', 55),
	(20180104, '论萨达姆的战争准备', 46)
	ON DUPLICATE KEY UPDATE `subject` = VALUES(`subject`); # 批量新增 student_score 记录，触发 PRIMARY KEY、UNIQUE KEY 则使用新增数据更新

# 2.新增记录（子查询）
# 语法
# 将子查询的结果集批量插入表
# 注意列名和值是一一对应的
INSERT INTO 表名(列名1, 列名2) 子查询;
# 示例
INSERT INTO student_score(number, `subject`, score)
	SELECT number, `subject`, score FROM student_score2 WHERE number > 20180103; # a.查询 student_score2 中指定学号数据 b.将该记录插入 student_score
```

### 修改记录

不使用 WHERE 执行修改是极度危险的

```sql
# 1.修改记录
# 语法
UPDATE 表名 SET 列名1 = 值1, 列名2 = 值2 [WHERE 普通过滤条件] [ORDER BY 排序] [LIMIT 开始行, 限制行数];
# 示例
UPDATE student_score2 SET `subject` = 'test1' WHERE number = 20180102 ORDER BY score DESC LIMIT 1; # 修改 student_score2 指定学号记录中按成绩降序排列第一条
```

### 删除记录

不使用 WHERE 执行删除是极度危险的

```sql
# 1.删除记录
# 语法
DELETE FROM 表名 [WHERE 普通过滤条件] [ORDER BY 排序] [LIMIT 开始行, 限制行数];
# 示例
DELETE FROM student_score2 WHERE number = 20180101 ORDER BY number ASC LIMIT 1; # 删除 student_score2 指定学号记录中升序排列第一条
```

## 6.视图

视图 VIEW 又称为虚拟表，本质就是一组 SQL 语句的别名或快捷方式，实质就是一张表，可以被各种方式查询。

### 显示视图

```sql
# 语法
SHOW CREATE VIEW 视图名;
# 示例
SHOW CREATE VIEW get_score_info_0020180102;
```

### 查询视图

```sql
# 语法
SELECT * FROM 视图名;
# 示例
SELECT * FROM get_score_0020180102; # 查询 get_score_0020180102
SELECT t1.*, t2.* FROM get_score_0020180102 t1
	LEFT JOIN student_info t2 ON t1.number = t2.number;  # 左外连接查询 虚拟表 get_score_0020180102 + 真实表 student_info
```

### 新增视图

可以通过一个视图创建另一个视图

```sql
# 语法
CREATE VIEW 视图名 AS 语句;
# 示例
CREATE VIEW get_score_0020180102 AS
	SELECT * FROM student_score
	  WHERE number = (SELECT `number` FROM student_info WHERE `name` = '杜琦燕'); # 新增查询杜琦燕各科成绩的视图
CREATE VIEW get_score_info_0020180102 AS
	SELECT t1.number, t2.`name`, t1.`subject`, t1.score FROM get_score_0020180102 t1
	  LEFT JOIN student_info t2 ON t1.number = t2.number; # 通过 get_score_0020180102 视图创建 get_score_info_0020180102 视图
```

### 修改视图

视图和普通表一样，可以执行各种增删改查操作，但强烈不推荐使用这类操作

### 删除视图

```sql
# 语法
DROP VIEW 视图名；
DROP VIEW IF EXISTS 视图名；
# 示例
DROP VIEW IF EXISTS get_score_info_0020180102;
```
