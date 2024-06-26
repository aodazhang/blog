---
lang: zh-CN
title: 数据类型
# sidebar: auto
---

## 常用

### 存储空间

```typescript
1 b（字节Byte）= 8 bit（位，存放一位二进制数，最小存储单元）
1 kb（千字节）= 1024 b（字节Byte）
1 mb（兆字节）= 1024 kb（千字节）
1 GB = 1024 mb
1 TB = 1024 GB
```

### 二进制常见平方数

```typescript
2^7 -> 128
2^8 -> 256

2^15 -> 32768
2^16 -> 65536

2^31 -> 2147483648
2^32 -> 4294967296
```

## 字符编码

### 字符

字符可以划分为可见与不可见两种，字符可以是一个字母、数字、标点符号、汉字，表情等

```typescript
// 可见字符
'a'、'b'、'我'
// 不可见字符
制表符、换行符
// 表情
😊😈
```

### 字符串

字符串由多个字符连接在一起

```typescript
'abc'、'me, to'
```

### 字符集

字符集是一堆字符的集合，例如中文字符集由一堆汉字组成的、而英文字符集由一堆英文字母组成的

- **Unicode 字符集**：Unicode 字符集被分成 17 个平面，每个平面 65536 个码位，共可容纳 110 万个字符，能够以单一的通用标准支持世界上所有的语言和文字。Unicode 已经成为现代所有操作系统、计算环境、编程语言和应用程序的字符编码的标准。

### 字符编码

**在计算机中如果想表示字符，则需要将该字符与一个特定的二进制字节序列进行映射，这个映射的过程叫做字符编码**。这种映射关系不唯一，因此存在多种编码格式。

![mysql](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202307281110544.png)

- **固定长度编码**：不同字符的字节数量相同。例如 ASCII 采用 1 个字节编码一个字符、ucs2 采用 2 个字节编码一个字符。

- **动态长度编码**：不同字符的字节数量不同。例如 utf8 采用 1~3 个字节编码一个字符、gb2312 采用 1~2 个字节编码一个字符。

  > utf8 在 mysql 中进行了阉割，正规 utf8 采用 1-4 个字节编码一个字符，是 Unicode 字符集最主流的编码方式，在 mysql 中称为 utf8mb4

  > utf32 采用 4 字节固定长度编码、utf16 采用 2 字节和 4 字节动态长度编码，目前基本弃用

  ```javascript
  // utf8 编码的字节序列
  11100110 10001000 10010001 // -> 3个字节编码字符 '我'
  ```

## 1.整数

在内存中直接存储每位整数，有符号整数采用第一位作为符号位

| 类型           | 存储空间 | 无符号范围 | 有符号范围     | 概念     |
| :------------- | :------- | :--------- | :------------- | :------- |
| TINYINT        | 1b       | 0 ~ 2^8-1  | -2^7 ~ 2^7-1   | 最小整数 |
| SMALLINT       | 2b       | 0 ~ 2^16-1 | -2^15 ~ 2^15-1 | 小整数   |
| MEDIUMINT      | 3b       | 0 ~ 2^24-1 | -2^23 ~ 2^23-1 | 中整数   |
| INT 或 INTEGER | 4b       | 0 ~ 2^32-1 | -2^31 ~ 2^31-1 | 整数     |
| BIGINT         | 8b       | 0 ~ 2^64-1 | -2^63 ~ 2^63-1 | 大整数   |

## 2.浮点数

非精准小数，在内存中按照符号位、指数位、尾数位存储浮点数

| 类型        | 存储空间 | 无符号范围               | 有符号范围               | 概念         |
| :---------- | :------- | :----------------------- | :----------------------- | :----------- |
| FLOAT(M,D)  | 4b       | ±1.175494351E-38         | ±3.402823466E+38         | 单精度浮点数 |
| DOUBLE(M,D) | 8b       | ±2.2250738585072014E-308 | ±1.7976931348623157E+308 | 双精度浮点数 |

- **`M`**：范围 1~255（默认为机器支持的最大值），该数十进制有效数字最大个数，`-2.3` 为 2、`0.9` 为 1

- **`D`**：范围 0~30（默认为机器支持的最大值），该数小数部分的十进制数字个数，`1.25` 为 2，`0.9` 为 1

  ```javascript
  FLOAT(4, 0) // 取值范围：-9999~9999
  FLOAT(4, 1) // 取值范围：-999.9~999.9
  FLOAT(4, 2) // 取值范围：-99.99~99.99
  ```

### 十进制转二进制

```typescript
/**
 * 整数：除二取余法 + 逆序排列
 * 小数：乘二取整法 + 顺序排列
 */
9.875 = 1*2^3 + 0*2^2 + 0*2^1 + 1*2^0 + 1*2^-1 + 1*2^-2 + 1*2^-3 = 1001.111
```

### 计算机存储小数

计算机按科学计数法 `a * 2^n` 存储二进制数

```typescript
/**
 * 符号位：1
 * 尾数位：001111
 * 指数位：3
 */
1001.111 = 1.001111 * (2 ^ 3)
```

### 浮点型存储结构

存储结构：符号位（1bit）+ 指数位（根据精度决定）+ 尾数位（根据精度决定）。浮点数使用字节越多，代表尾数和指数的范围越大。

缺陷：由于小数部分采用 **乘二取整**，例如 0.25、0.5 这种小数可以快速归 1 获取到准确结果，而 0.1、0.2 这种小数永远不能获取准确结果从而进入死循环，**js 根据 IEEE 754 规范，对第 53 位尾数进行了 0 舍 1 入，这是计算机浮点数运算出现误差的本质（其他语言也一样）**。

解决方法：通常将小数转换为整数进行运算，再转换为小数。

![image-20230604105539154](https://aodazhang.oss-cn-shanghai.aliyuncs.com/img/202306041055210.png)

- **单精度浮点数格式**：符号位（1bit）+ 指数位（8bit）+ 尾数位（23bit）
- **双精度浮点数格式**：符号位（1bit）+ 指数位（11bit）+ 尾数位（52bit）

## 3.定点数

精准小数，在内存中整数、小数都按照整数分组存储，其中一组为 9 个十进制数

| 类型         | 存储空间           | 无符号范围         | 有符号范围         | 概念     |
| :----------- | :----------------- | :----------------- | :----------------- | :------- |
| DECIMAL(M,D) | 根据 M、D 动态变化 | 根据 M、D 动态变化 | 根据 M、D 动态变化 | 精准小数 |

- **`M`**：范围 1~65（默认为 10），整数部分的十进制数字个数

- **`D`**：范围 0~30（默认为 0），小数部分的十进制数字个数，D 不能大于 M

  ```typescript
  /**
   * 整数：12位
   * 小数：4位
   * 存储空间：2b + 4b + 2b = 8b
   */
  DEMCIMAL(16, 4);
  // 1.将十进制数字划分为3组
  1234567890.1234 = 1 234567890 1234
  // 2.用二进制转换每一组数据进行存储
  1 = 00000000 00000001 // 2字节 16bit
  234567890 = ... // 4字节 32bit
  1234 = .... // 2字节 16bit
  // 3.对于正数需要将最高位设置为1，对于负数将每一个 bit 按位取反
  ```

### 存储空间

| 每组十进制位数 | 存储空间 |
| :------------- | :------- |
| 1 ~ 2          | 1b       |
| 3 ~ 4          | 2b       |
| 5 ~ 6          | 3b       |
| 7 ~ 9          | 4b       |

## 4.无符号数

对于确定的非负整数、浮点数、定点数，可以采用无符号数声明

```sql
# 语法
数值类型 UNSIGNED
# 示例
INT UNSIGNED
FLOAT UNSIGNED
DECIMAL UNSIGNED
```

- **正数**：通过 `UNSIGNED` 声明可以让正数范围扩大一倍
- **浮点数、定点数**：受限于存储格式，`UNSIGNED` 不会影响正数范围

## 5.日期时间

MySQL5.6.4 之后，`TIME` 、`DATETIME` 、`TIMESTAMP` 添加了对毫秒、微秒的支持

| 类型      | 存储空间 | 取值范围                                       | 概念        |
| :-------- | :------- | :--------------------------------------------- | :---------- |
| YEAR      | 1b       | 1901 ~ 2155                                    | 年          |
| DATE      | 3b       | '1000-01-01' ~ '9999-12-31'                    | 日期        |
| TIME      | 3b       | '-838:59:59' ~ '838:59:59'                     | 时间        |
| DATETIME  | 8b       | '1000-01-01 00:00:00' ～ '9999-12-31 23:59:59' | 日期 + 时间 |
| TIMESTAMP | 4b       | '1970-01-01 00:00:01' ～ '2038-01-19 03:14:07' | 时间戳      |

### FORMAT

```sql
# 语法
YYYY：年
MM：月
DD：日
hh：时
mm：分
ss：秒
uuuuuu：小数秒
```

### 对比

- **`TIME`**：代表时间，格式 `hh:mm:ss[.uuuuuu]`
- **`DATETIME`**：代表日期时间，格式 `YYYY-MM-DD hh:mm:ss[.uuuuuu]`
- **`TIMESTAMP`**：代表时间戳，指某个时刻距离 `1970-01-01 00:00:00` 的秒数。该类型相对 `DATETIME` 的优点在于可以跟随时区的变化而变化

### 声明小数秒位

```sql
TIME(1) # '13:54:32.1'
DATETIME(1) # '2023-06-04 13:54:32.1'
TIMESTAMP(1)
```

### 额外存储空间

声明小数秒位额外需要的空间

| 小数秒位 | 额外存储空间 |
| :------- | :----------- |
| 0        | 0b           |
| 1 ~ 2    | 1b           |
| 3 ~ 4    | 2b           |
| 5 ~ 6    | 3b           |

## 6.字符串

| 类型       | 存储空间                                   | 取值范围                       | 概念           |
| ---------- | :----------------------------------------- | :----------------------------- | -------------- |
| CHAR(M)    | L = M \* W（不同编码格式一个字符所需字节） | 固定 M 个字符（0~255，默认 1） | 固定长度字符串 |
| VARCHAR(M) | L + 1 / 2                                  | 最多 M 个字符（1~65535）       | 可变长度字符串 |
| TINYTEXT   | L + 1                                      | 2^8-1 个字符                   | 最小字符串     |
| TEXT       | L + 2                                      | 2^16-1 个字符                  | 小字符串       |
| MEDIUMTEXT | L + 3                                      | 2^24-1 个字符                  | 中字符串       |
| LONGTEXT   | L + 4                                      | 2^32-1 个字符                  | 大字符串       |

### 受限字符串

- **`CHAR(M)`**：如果 M 为 0，只能存储空字符串 `''` 和 `NULL`。若字符实际占用空间 < 声明存储空间，剩余部分用空字符串 `''` 补齐

  ```typescript
  占用字节数：M * W = L 字节
  ```

- **`VARCHAR(M)`**：包含占用字节数和字符串内容，**MySQL 中某一行中每列存储的数据大小不得超过 65535 个字节**，因此理论上 M 不会大于 65535，`VARCHAR` 占用字节数的临界值为 256

  ```typescript
  占用字节数：L < 256 ? 1 : 2
  ```

### 不受限字符串

`TINYTEXT` 、`TEXT` 、`MEDIUMTEXT` 、`LONGTEXT` 不受 MySQL 中某一行中每列存储的数据大小不得超过 65535 个字节的限制

## 7.枚举

在给定的字符串列表里选择一个或多个

| 类型              | 存储空间 | 取值范围 | 概念     |
| :---------------- | :------- | :------- | :------- |
| ENUM(值, 值, ...) |          |          | 枚举单选 |
| SET(值, 值 ...)   |          |          | 枚举多选 |

## 8.二进制数据

对于图片、音频、文件这类二进制数据，一般采用文件系统存储，然后在数据库存储文件路径即可

| 类型         | 存储空间 | 取值范围 | 概念                 |
| :----------- | :------- | :------- | :------------------- |
| BIT(M)       |          |          | 比特数据             |
| BINARY(M)    |          |          | 固定长度 binary 数据 |
| VARBINARY(M) |          |          | 可变长度 binary 数据 |
| TINYBLOB     |          |          | 最小 blob 数据       |
| BLOB         |          |          | 小 blob 数据         |
| MEDIUMBLOB   |          |          | 中 blob 数据         |
| LONGBLOB     |          |          | 大 blob 数据         |
