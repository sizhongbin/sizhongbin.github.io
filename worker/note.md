npm config set registry https://registry.npmmirror.com/  
npm install wrangler --save-dev 
npx wrangler login 
npx wrangler generate sora-server
npx wrangler dev src/index.js
npx wrangler publish src/index.js --name sora-server  
npx wrangler d1 execute sora-data --local --file=./schema.sql
npx wrangler d1 execute sora-data --local --command="SELECT * FROM Enemy"

npm update wrangler --save

SELECT * FROM Customers WHERE CompanyName = ?

select * from sqlite_master

SELECT lower( hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(6)) ) GUID

DROP TABLE IF EXISTS Account;
CREATE TABLE IF NOT EXISTS Account (ID TEXT PRIMARY KEY, MAIL TEXT, PASS TEXT);

DELETE FROM Account;
DELETE FROM Account WHERE ID = 7;

ALTER TABLE Account
ADD COLUMN IS_GM INTEGER;

UPDATE Account
SET
  IS_GM = 0 WHERE MAIL = "178958037@qq.com";

200	OK	请求成功。一般用于GET与POST请求
201	Created	已创建。成功请求并创建了新的资源
202	Accepted	已接受。已经接受请求，但未处理完成
203	Non-Authoritative Information	非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本
204	No Content	无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档
205	Reset Content	重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域
206	Partial Content	部分内容。服务器成功处理了部分GET请求

状态码	名称	说明
400	Bad Request	表示其他错误，就是4xx都无法描述的前端发生的错误
401	Authentication	表示认证类型的错误
403	Authorization	表示授权的错误（认证和授权的区别在于：认证表示“识别前来访问的是谁”，而授权则是“赋予特定用户执行特定操作的权限”）
404	Not Found	表示访问的数据不存在
405	Method Not Allowd	表示可以访问接口，但是使用的HTTP方法不允许
406	Not Acceptable	表示API不支持前端指定的数据格式
408	Request Timeout	表示前端发送的请求到服务器所需的时间太长
409	Confilct	表示资源发生了冲突，比如使用已被注册邮箱地址注册时，就引起冲突
410	Gone	表示访问的资源不存在。不单表示资源不存在，还进一步告知该资源该资源曾经存在但目前已消失
413	Request Entity Too Large	表示请求的消息体过长而引发的错误
414	Request-URI Too Large	表示请求的首部过长而引发的错误
415	Unsupported Media Type	表示服务器端不支持客户端请求首部Content-Type里指定的数据格式
416	Range Not Satisfiable	表示无法提供Range请求中的指定的那段包体
417	Expectation Failed	表示对于Expect请求头部期待的情况无法满足时的响应码
421	Misdirected Request	表示服务器认为这个请求不该发给它，因为它没能力处理
426	Upgrade Required	表示服务器拒绝基于当前HTTP协议提供服务，通过Upgrade头部告知客户端必须升级协议才能继续处理
428	Precondition Required	表示用户请求中缺失了条件类头部，例如If-Match
429	Too Many Requests	表示客户端发送请求的速率过快
431	Request Header Fields Too Large	表示请求的HEADER头部大小超出限制
451	Unavailable For Legal Reasons	表示由于法律原因不可访问