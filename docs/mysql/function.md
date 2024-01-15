---
lang: zh-CN
title: 表达式与函数
# sidebar: auto
---

## 1.操作数

### 常数

```sql
1、'abc'、2019-08-16 17:10:43
```

### 列名

```sql
test1
```

### 函数调用

```sql
NOW()
```

### 子查询

```sql

```

### 表达式

```sql
(col - 5) / 3
```

## 2.操作符

### 算数操作符

```sql
+、-、*、/、DIV（除法商取整）、%（除法取余）、-（负号）
```

### 比较操作符

```sql
=
<>、!=
<、<=、>、>=
BETWEEN（位于之间）、NOT BETWEEN（位于之间）
IN（列表中某一项）、NOT IN（不是列表中某一项）
IS NULL（为空）、IS NOT NULL（不为空）
LIKE（模糊匹配）、NOT LIKE（模糊不匹配）
```

### 逻辑操作符

```sql
AND（且）、OR（或）、XOR（仅一真为真）
```

## 3.表达式

> 表达式 = 操作数 + 操作符

### 作为列名

对某列数据进行处理

```sql
SELECT number, `subject`, score + 100 计算分数 FROM student_score; # score 列所有值 + 100
SELECT CONCAT('学号-科目-成绩：', number, '-', `subject`, '-', score) AS 成绩描述 FROM student_score; # 按列拼接值
```

### 作为搜索条件

对某表数据进行过滤

```sql
SELECT number, `subject`, score FROM student_score WHERE score > 90;
```

## 4.隐式转换

### 操作符隐式转换

```sql
1 + 2 # -> 3
'1' + 2 # -> 3
'1' + '2' # -> 3
```

### 函数隐式转换

```sql
CONCAT('1', '2') # -> '12'
CONCAT('1', 2) # -> '12'
CONCAT(1, 2) # -> '12'
```

### 新增数据隐式转换

```sql
CREATE TABLE test(i1 TINYINT, i2 VARCHAR(100));
INSERT INTO test(i1, i2) VALUES('100', 200); # -> 100、'200'
```

## 5.统计函数

> 在 WHERE 过滤后执行，不能放在搜索条件中

### 指定列行数

```sql
COUNT(*) # -> 6（包含值为 null 的行）
COUNT(列名) # -> 5（不包含值为 null 的行）

SELECT COUNT(DISTINCT department) 去重后专业数量, AVG(number) 学号平均值
	FROM student_info
	WHERE number > 0020180101; # 在 学号>0020180101 的记录中计算 去重后专业数量、学号平均值
```

### 指定列最大值

```sql
MAX(列名) # -> 100
```

### 指定列最小值

```sql
MIN(列名) # -> 45
```

### 指定列值之和

```sql
SUM(列名) # -> 585
```

### 指定列平均值

```sql
AVG(列名) # -> 73.1250
```

## 6.字符串函数

### 长度

```sql
LENGTH('abc')  # -> 3
```

### 转换大小写

```sql
LOWER('Abc') # -> 'abc'
UPPER('Abc') # -> 'ABC'
```

### 左/右去空格

```sql
LTRIM(' abc') # -> 'abc'
RTRIM('abc ') # -> 'abc'
```

### 左/右截取指定长度的子串

```sql
# 参数1：字符串
# 参数2：截取长度
LEFT('abc123', 3) # -> 'abc'
RIGHT('abc123', 3) # -> '123'
```

### 指定位置截取指定长度的子串

```sql
# 参数1：字符串
# 参数2：字符串索引，从1开始
# 参数3：截取长度
SUBSTRING('abc123', 2, 3) # -> 'bc1'
```

### 拼接

```sql
CONCAT('abc', '123', 'xyz') # -> 'abc123xyz'
```

## 7.日期时间函数

### 获取当前日期时间

```sql
NOW() # -> 2019-08-16 17:10:43
```

### 获取当前日期

```sql
CURDATE() # -> 2019-08-16
```

### 获取当前时间

```sql
CURTIME() # -> 17:10:43
```

### 获取指定日期

```sql
DATE('2019-08-16 17:10:43') # -> 2019-08-16
```

### 根据 format 转换日期时间

```sql
# 年月日
  # %Y：4位数字形式的年（例如 2019）
  # %y：2位数字形式的年（例如 19）
  # %M：英文月份（例如 January、February、...、December）
  # %b：简写英文月份（例如 Jan、Feb、...、Dec)
  # %m：数值月份（例如 00~12）
  # %D：英文日期（例如 0th、1st、2nd、...、31st）
  # %d：数值日期（例如 00~31）
# 时分秒
  # %H：24小时制 (例如 00~23)
  # %h：12小时制 (例如 01~12)
  # %i：分钟（例如 00~59）
  # %S：秒（例如 00~59）
  # %s：秒（例如 00~59）
  # %f：微秒（例如 000000~999999）
# 其他
  # %p：上午或下午（例如 AM、PM）
  # %W：英文星期（例如 Sunday、Monday、...、Saturday）
  # %w：数值星期（例如 0=星期日、1=星期一、 6=星期六）
DATE_FORMAT(NOW(),'%m-%d-%Y') # -> 08-16-2019
```

### 获取两个日期间隔的天数

负数代表前一个参数代表的日期比较小

```sql
DATEDIFF('2019-08-16', '2019-08-17') # -> -1
```

### 获取指定间隔之前/后的日期时间

```sql
# YEAR 年
# QUARTER 季度
# MONTH 月
# WEEK 星期
# DAY 天
# HOUR 小时
# MINUTE 分钟
# SECOND 秒
# MICROSECOND 毫秒
DATE_SUB('2019-08-16 17:10:43', INTERVAL 2 DAY) # -> 2019-08-14 17:10:43
DATE_ADD('2019-08-16 17:10:43', INTERVAL 2 DAY) # -> 2019-08-18 17:10:43
```

## 8.数学函数

### 绝对值

```sql
ABS(-1) # -> 1
```

### 回圆周率

```sql
PI() # -> 3.141593
```

### 随机数

```sql
RAND() # -> 0.7537623539136372
```

### e 指定次幂

```sql
EXP(1) # -> 2.718281828459045
```

### 除法余数

```sql
MOD(5, 2) # -> 1
```

### 平方根

```sql
SQRT(9) # -> 3
```

### 正弦

```sql
SIN(PI() / 2) # -> 1
```

### 余弦

```sql
COS(PI())	# -> -1
```

### 正切

```sql
TAN(0) # -> 0
```
