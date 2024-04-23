SET nocount ON
SET dateformat ymd
USE master
GO

IF NOT EXISTS (SELECT * FROM syslogins WHERE name='u1')
  EXEC sp_addlogin u1,u1
GO

IF EXISTS(SELECT *FROM sysdatabases WHERE name='BookStoreDB')
   DROP DATABASE BookStoreDB
GO
CREATE DATABASE BookStoreDB
ON PRIMARY
 (name='bookstore',
 filename='d:\sqlwork\bookstore.mdf',
 size=5,
 maxsize=20,
 filegrowth=1)
LOG ON
(name='bookstorelog',
filename='d:\sqlwork\bookstore_log',
  size=2,
  maxsize=10,
  filegrowth=1)
GO

USE BookStoreDB
GO
EXEC sp_adduser u1, u1
GO

-- 创建表及插入数据
/*创建职员表  01*/
CREATE TABLE Employee (
   employeeNo   char(10)  PRIMARY KEY,    /*职员编号*/
       check (employeeNo like '[E-F][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'), 
   empPassword  varchar(10)  NOT NULL,     /*登陆密码*/
   empName     varchar(20)  NOT NULL,     /*员工姓名*/
   sex          char(2) ,                     /*员工性别, 在‘男’和‘女’中取值*/
   birthday      datetime,                    /*出生日期*/
   department    varchar(30) ,                 /*所属部门*/
   title          varchar(20) ,                 /*职务*/
   salary        numeric,                    /*薪水*/
   address       varchar(40) ,                 /*员工住址*/
   telephone     varchar(15) ,                 /*员工电话*/
   email        varchar(20) ,                 /*员工邮箱*/
)
GO
/*Employee表插入数据 */
INSERT Employee VALUES('E000000001','45871256', '张强', 'M','19760415','采购','职员',4800, '南昌市八一大道', '15948715269','zq@126.com')
INSERT Employee VALUES('E000000002','dfg15412', '李林', 'M','19781204','技术','部长',10000,'南昌市孺子路', '15848655239','lilin@163.com')
INSERT Employee VALUES('E000000003','4564gh16', '陈嘉燕','F','19850625','会计','职员',4400, '南昌市八一大道', '13848715369','cjy@126.com')
INSERT Employee VALUES('E000000004','15sdw256', '杨阳', 'M','19810216','技术','职员',5000, '南昌市阳明路',  '13458487152','yang@126.com')
INSERT Employee VALUES('E000000005','s712dfgh56', '郑倩', 'F','19790415','会计','部长',9900, '南昌市青海路', '13045415258','zqian@163.com')
INSERT Employee VALUES('E000000006','1241256', '姜涵', 'F','19740106','业务','职员',3900, '南昌市中山路', '13365215269','han@126.com')
GO

/*创建会员等级表  02*/
CREATE TABLE MemberClass(
   memLevel     char(1)   NOT NULL  PRIMARY KEY,  /*VIP等级*/
   levelSum      numeric  NOT NULL,                 /*等级购书额定*/
   memDiscount  float     NOT NULL,                 /* 享受折扣*/ 
)
GO
/*MemberClass表插入数据 */
INSERT  MemberClass VALUES('0',100,10)  
INSERT  MemberClass VALUES('3', 95, 9.5) 
INSERT  MemberClass VALUES('2', 90, 9) 
INSERT  MemberClass VALUES('1', 85, 8.5) 
GO

/*创建会员表  03*/
CREATE TABLE Member(
   memberNo     char(10)  PRIMARY KEY,   	/*会员编号*/
      check(memberNo like '[M-Z][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
   memPassword  varchar(10)  NOT NULL,     /*登陆密码*/
   memName       varchar(20)  NOT NULL,     /*会员姓名*/
   sex           char(2),                    /*会员性别*/
   birthday       datetime,                   /*出生日期*/
   telephone      varchar(15)  NOT NULL,     /*会员电话*/
   email         varchar(20) ,                 /*会员邮箱*/
   address        varchar(40)  NOT NULL,     /*会员住址*/
   zipCode       char(6)      NOT NULL,     /*邮政编码*/
   unit	      	 varchar(20)  NOT NULL,	     /*单位*/
   totalAmount    numeric,                    /*购书总额*/
   memLevel     char(1)     NOT NULL,      /*VIP等级, ‘1’- 一级, ‘2’-二级，‘3’-二级 */
)
GO
/*Member表插入数据*/
INSERT  Member VALUES('M000000001', '8574125', '刘枫', '男', '19880714', '13145287895', 'liufeng@126.com', '南昌市财大枫林园', '330013','江西财大信息管理学院', 900, '1')
INSERT  Member VALUES('M000000002','dfg2343', '陈辉', '男','19870213', '15984752654', 'chui@163.com', '南昌市青山湖中大道', '330029','南昌春秋印刷厂', 10000, '3')
INSERT  Member VALUES('M000000003','54hjhjfgh', '陈杰', '女', '19901201', '13112547852', 'jie@126.com', '上海市华灵西路', '200442', '上海佳加贸易有限公司',12000, '3')
INSERT  Member VALUES('M000000004','54sfdse', '张小东', '男', '19800115', '15854698520', 'dong123@126.com',  '重庆市万州区', '404100','重庆市计生委',500,  '0')
INSERT  Member VALUES('M000000005','sdwe787',  '毛小鹏', '男', '19741012', '13120504182', 'mxp568@163.com', '上海市浦东路', '201411', '东路桥建设公司',21000, '2')
INSERT  Member VALUES('M000000006','sr587555', '周军',  '男', '19810514', '15954852100', 'junzhou@163.com', '丽江市', '674100','公安局交警支队',410,  '1')
INSERT  Member VALUES('M000000007','w558412', '赵丹',  '女', '19690510', '13021582325', 'dan@163.com', '重庆市北碚区', '400700','重庆市北碚区人力社保',22000,'2')
INSERT  Member VALUES('M000000008','3352658', '胡倩', '女', '19910316', '13021996588', 'huqian@126.com', '怀化市', '418000', '怀化市人防办',33000, '1')
GO

/*创建出版社表  04*/
CREATE TABLE Press(
   pressNo      char(12)  PRIMARY KEY,  /*出版社编号*/
   pressName    varchar(20)  NOT NULL,  /*出版社名称*/
   address       varchar(40)  NOT NULL,  /*出版社地址*/
   zipCode      char(6),                  /*邮政编码*/
   contactPerson  varchar(12),              /*联系人*/ 
   telephone     varchar(15),              /*联系电话*/
   fax          varchar(15),              /*传真*/
   email        varchar(20) ,              /*电子邮箱*/
)
GO
/* Press表插入数据:*/
INSERT  Press VALUES('7-111', '机械工业出版社', '北京百万庄大街22号', '100037', '代小姐', '010-88379639', '010-68990188', 'service@book.com')
INSERT  Press VALUES('7-107', '人民教育出版社', '北京市沙滩后街55号', '100009', '魏国栋',  '010-64035745', null, 'pep@pep.com.cn')
INSERT  Press VALUES('7-5327', '上海译文出版社', '上海市福建中路193号世纪出版大厦', '200001', '市场部', '021-63914556', null, 'market@yiwen.com.cn')
INSERT  Press VALUES('7-1210', '电子工业出版社', '北京市万寿路南口金家村288号华信大厦', '100000', '宋飚', '010-88258888', '010-8825411', 'duca@phei.com.cn')
INSERT  Press VALUES('7-102', '人民文学出版社', '北京市东城区朝内大街166号', '100705', '李凯', '010-65221920', '010-65596873', 'faxing@rw-cn.com')
GO

/*创建图书表  05*/
CREATE TABLE Book (
   ISBN        char(17)      PRIMARY KEY,  /*书号*/
   bookTitle     varchar(30)    NOT NULL,     /*书名*/
   author        varchar(40)   NOT NULL,     /*作者*/
   publishDate   datetime,                     /*出版日期*/
   version       int,                         /*版次*/
   category      varchar(20),		         /*类别*/
   stockNumber  int,                         /*库存数量*/
   price         numeric      NOT NULL,     /*定价*/
   bookDiscount  float,     		         /*图书折扣*/
   introduction   varchar(500),                 /*内容简介*/
   catalog       varchar(500) ,                /*目录*/
   pressNo      char(12) ,                    /*出版社编号*/
   FOREIGN KEY(pressNo) REFERENCES Press(pressNo)
)
GO
/* Book表插入数据*/
INSERT Book VALUES('97871112160631111', 'Linux 网络技术', '王波','20070701', '1','计算机/网络', '20', '28', '0.9' , '从Linux操作系统基础入手，以丰富的示例为依托，循序渐进地讲述了Linux系统中典型的网络技术与应用。','第1章 概述与安装,第2章 命令与示例,第3章 shell编程基础, 第4章 DNS服务,第5章 DHCP服务,第6章 Apache服务,第7章 VSFTPD服务,第8章 Samba服务,第9章 iptables,第10章 squid,第11章 sendmail JZ,第12章 SSH','7-111')
INSERT Book VALUES('97871110756601111','TCP/IP 详解(卷1:协议)','史蒂文斯著，范建华等译', '20060501','1','计算机/网络','10','45','0.9', '本书不仅仅讲述了RFCS的标准协议，而且结合大量实例讲述了TCP/IP协议包的定义原因及在各种不同的操作系统中的应用与工作方式', '第1章 概述，第2章 链路层，第3章 IP：网际协议，第4章 ARP：地址解析协议，第5章 RARP：逆地址解析协议，第6章 ICMP：Internet控制报文协议，第7章 Ping程序，第8章 Traceroute程序等30章', '7-111')
INSERT Book VALUES('97875327460711111','辩证法的历险（法国思想家译丛）','梅洛－庞蒂著，杨大春，张尧均译','20090101','1','哲学/宗教','9','28','0.8', '梅洛—庞蒂不仅首次采用了“西方的马克 思主义”这一提法，并且以韦伯式的自由主义立场来理解马克思主义与辩证法的意义。','第一章 知性的危机，第二章“西方的”马克思主义，第三章 《真理报》，第四章 行动中的辩证法，第五章 萨特与极端布尔什维克主义','7-5327')
INSERT Book VALUES('97871210664431111','加密与解密（第三版）','段钢','20080701','1','计算机/网络','51','59','0.9', '以加密与解密为切入点，讲述了软件安全领域许多基础知识和技能，如调试 技能、逆向分析、加密保护、外壳开发、虚拟机设计等。','第1章 基础知识,第2章 动态分析技术,第3章 静态分析技术, 第4章 逆向分析技术,第5章 常见的演示版保护技术等19章','7-1210')
INSERT Book VALUES('97875327469341111','时间现象学的基本概念','黑尔德著，靳希平等', '20081201','1','自然科学/天文学','18','15','0.85', '此书由克劳斯•黑尔德教授在北大的6个讲座组成。这些讲座主要梳理了从毕达哥拉斯学派至胡塞尔及海德格尔的现象学对时间问题的探讨。','第一讲 作为数字的时间——毕达哥拉斯学派的时间观念,第二讲 时间和永恒的古代形而上学,第三讲 胡塞尔和海德格尔的本已时间,第四讲 判断力的长处与弱点,第五讲 希望现象学,第六讲 世代生成的时间经验','7-5327')
INSERT Book VALUES('97871151756251111','深入浅出MySQL数据库开发','唐汉明等编著', '20080401','1','计算机/网络/数据库','60','59','45','从数据库的基础、开发、优化、管理维护4个方面对MySQL进行了详细的介绍','第1章 MySQL的安装与配置,第2章 SQL基础,第3章 MySQL支持的数据类型,第4章 MySQL中的运算符,第5章 常用函数,第6章 图形化工具的使用等31章','7-102')
INSERT Book VALUES('97871210403441111','思科实验室路由、交换实验指南','梁广民，王隆杰编著', '20070401','1','计算机/网络','36','55','0.9','本书以Cisco2821路由器、Catalyst3560 和Catalyst2950交换机为平台，以Cisco　IOS（12.4版本）为软件平台，以实验为依托，从实际应用的角度介绍了网络工程中使用的技术。','第1章 实验拓扑、终端服务器配置,第2章 路由器基本配置,第3章 静态路由,第4章 RIP,第5章 EIGR等25章','7-1210')
INSERT Book VALUES('97872000633321111','魔法诱惑','刘谦','20060101','1','家居/休闲游戏','55','18','0.8', '数十种神奇魔术全程大揭秘！让你成为高手中的高手.','脉博测谎术,敏锐的手指,超级空手道,数学读心术,杯子上的硬币,魔术师自语之一,魔术的魅力,如何可观赏及表演魔术等','7-107') 
GO

/*创建留言表  06*/
CREATE TABLE Message(
   messageNo       char(10)     PRIMARY KEY,  /*留言编号*/
   memberNo       char(10)     NOT NULL,      /*发布会员编号*/
   releaseDate       datetime     NOT NULL,     /*留言日期*/
   messageContent   varchar(100)  NOT NULL,     /*留言内容*/
   FOREIGN KEY (memberNo) REFERENCES Member(memberNo)
)
GO
/*Message表插入数据*/
INSERT Message VALUES('LY00000001','M000000003','20060612','<<TCP/IP>> 详解对初学者来说是很有用的一本书,满意')
INSERT Message VALUES('LY00000002','M000000005','20061224','书的种类较少，能否对书的种类进行扩充？')
INSERT Message VALUES('LY00000003','M000000007','20070112','书的质量不是很好，希望能够采购质量较好的书籍')
INSERT Message VALUES('LY00000004','M000000001','20070916','这是一本很不错的  网络工程师教材，内容丰富，详细而不乏内容的互动！')
INSERT Message VALUES('LY00000005','M000000008','20071124','发书速度较慢，希望能够改进')
INSERT Message VALUES('LY00000006','M000000001','20080122','找到了想要的书，感谢该网站')
GO

/*创建留言回复表  07*/
CREATE TABLE MessageReply(
   messageNo       char(10)     NOT NULL,	  /*留言编号*/
   replyNo		    char(4)	 NOT NULL,     /*回复编号*/
   employeeNo      char(10)     NOT NULL,    /*回复职员编号*/
   memberNo       char(10)     NOT NULL,    /*回复会员编号*/
   replyDate        datetime,                   /*回复时间*/
   replyContent      varchar(100),                /*回复内容*/
   constraint  PK_MessageReply primary key(messageNo, replyNo),
   FOREIGN KEY (messageNo)  REFERENCES Message(messageNo),
   FOREIGN KEY (employeeNo) REFERENCES Employee(employeeNo),
   FOREIGN KEY (memberNo)  REFERENCES Member(memberNo)
)
GO
/*Message表插入数据*/
INSERT MessageReply VALUES('LY00000001','R001','E000000001','M000000003','20060615','感谢读者对本书给予的肯定')
INSERT MessageReply VALUES('LY00000002','R002','E000000006','M000000005','20061230','我们将努力丰富书的种类')
INSERT MessageReply VALUES('LY00000003','R003','E000000002','M000000007','20070113','我们将对书的质量加以改进')
INSERT MessageReply VALUES('LY00000004','R004','E000000005','M000000001',null,null)
INSERT MessageReply VALUES('LY00000005','R005','E000000003','M000000008','20071128','我们将努力改进')
INSERT MessageReply VALUES('LY00000006','R006','E000000006','M000000001',null,null)
GO	  

/*创建订单表  08*/
CREATE TABLE OrderSheet(
   orderNo       char(15)  PRIMARY KEY,  /*订单编号*/
   memberNo     char(10)    NOT NULL,     /*会员编号*/
   employeeNo    char(10)   NOT NULL,     /*职员编号*/
   orderDate      datetime  NOT NULL,     /*订购日期*/
   tolAmtReceiva  numeric	      NULL,	  /*应收总金额*/
   tolPaidAmount	 numeric      NULL,	  /*实收总金额*/
   memDiscount	 float	      NULL,	      /*会员折扣*/
   payWay       char(1)     NOT NULL,    /*付款方式，‘L’—在线支付，‘S’—上门付款*/
   payFlag       char(1)    NOT NULL,    /*是否付款，‘Y’—已付款，‘N’—未付款*/
   orderState     char(1)    NOT NULL,   /*订单状态，‘A’—未审核，‘B’—退回，‘C’—已审核，
            ‘D’—“已部分配送”、‘E’—“已全部配送”、F’—已处理结束*/
   invoiceUnit    varchar(40)     NULL,  /*发票单位*/
   FOREIGN KEY (memberNo) REFERENCES Member(memberNo),
   FOREIGN KEY (employeeNo) REFERENCES Employee(employeeNo)
)
GO
/* OrderSheet表插入数据*/
INSERT OrderSheet VALUES('200801010000001','M000000003','E000000001','20060607',null,null,0.85,'L', 'Y','D',  '上海理工大学')
INSERT OrderSheet VALUES('200801010000002','M000000007','E000000003','20061101',null,null,0.9,'L', 'Y','D','重庆工商银行')
INSERT OrderSheet VALUES('200801010000003','M000000002','E000000006','20070711', null,null, 0.85, 'S', 'Y','C', '江西省江铃集团')
INSERT OrderSheet VALUES('200801010000004','M000000002','E000000002','20070803',null,null,0.85,'S', 'Y','D','北京交通大学')
INSERT OrderSheet VALUES('200801010000005','M000000005','E000000004','20071219',null,null, 0.8, 'L', 'Y','C','西安民航')
INSERT OrderSheet VALUES('200801010000006','M000000008','E000000005','20080524',null,null,0.85,'S', 'N','A','上海市交通局')
INSERT OrderSheet VALUES('200801010000007','M000000001','E000000004','20080806',null,null,0.75, 'L', 'Y','D','昆明机械加工厂')
INSERT OrderSheet VALUES('200801010000008','M000000005','E000000001','20081009',null,null,0.9,'L', 'Y','C','杭州信佳食品有限公司')
INSERT OrderSheet VALUES('200801010000009','M000000006','E000000006','20090211',null,null,0.85,'S', 'N','B','厦门大学')
INSERT OrderSheet VALUES('200801010000010','M000000004','E000000002','20090301',null,null,0.9,'L', 'Y','D','重庆晴雨服装有限公司')
GO	
  
/*创建订单明细表   09*/
CREATE TABLE OrderBook(
   orderNo      char(15)     NOT NULL,    /*订单编号*/
   ISBN        char(17)      NOT NULL,    /*图书编号*/
   quantity       int        NOT NULL,     /*订购数量*/
   price	     numeric     NOT NULL,     /*定价*/
   amtReceivable numeric     NULL,        /*应收金额*/
   bookDiscount  float       NOT NULL,     /*图书折扣*/
   paidAmt       numeric     NULL,         /*实收金额*/
   shippedQuantity int       NOT NULL,     /*已配送数量*/
   shipState      char(1)    NOT NULL,     /*配送状态，‘A’—未配送，‘B’—已部分配送，‘C’—已全部配送
                                  ‘D’—已部分送到，‘E’—已全部送到 */
CONSTRAINT PK_OrderBook PRIMARY KEY (orderNo, ISBN)
)
GO
/*OrderBook表插入数据:*/
INSERT OrderBook VALUES('200801010000001','97871110756601111',2,45,null,0.9,null,2,'C')
INSERT OrderBook VALUES('200801010000002','97872000633321111',1,18,null,0.8,null,1,'C')
INSERT OrderBook VALUES('200801010000004','97871110756601111',1,45,null,0.9,null,1,'C')
INSERT OrderBook VALUES('200801010000004','97871210403441111',1,55,null,0.9,null,1,'C')
INSERT OrderBook VALUES('200801010000005','97871112160631111',2,28,null,0.9,null,2,'B')
INSERT OrderBook VALUES('200801010000007','97871210403441111',5,55,null,0.9,null,5,'C')
GO
/*计算OrderBook表中的应收金额和实收金额:*/
update OrderBook
set amtReceivable =quantity *price ,paidAmt =(quantity *price)*bookDiscount 
GO
/*计算OrderSheet表中的应收总金额*/
update OrderSheet
set tolAmtReceiva =sumPaidAmt
from OrderSheet a,(select orderNo,sum(paidAmt) sumPaidAmt
                   from OrderBook group by orderNo) b
where a.orderNo=b.orderNo 
GO
/*计算OrderSheet表中的实收总金额:*/
update OrderSheet
set tolPaidAmount =tolAmtReceiva*memDiscount 
GO

/*创建配送公司表  10*/
CREATE TABLE Company(
   companyNo    char(12)      PRIMARY KEY,  /*公司编号*/
   companyName  varchar(20)   NOT NULL,     /*公司名称*/
   address        varchar(40)  NOT NULL,     /*公司地址*/
   zipCode        char(6),                    /*邮政编码*/
   contactPerson   varchar(12) ,                /*联系人*/
   telephone       varchar(15),             	/*联系电话*/
   fax            varchar(20) ,                /*传真*/
   email          varchar(20) ,                /*电子邮箱*/
) 
GO
/*Company表插入数据*/
INSERT Company VALUES('CM0001','上海中驿快递','上海市浦东路16号','201411','李海平', '15954782541','021-63654556','shzhongyi@126.com')
INSERT Company VALUES('CM0002','南昌万家物流有限公司','南昌市站前西路121', '330003','张齐','0791-2151386','0791-8321603','wanjialiu@126.com')
INSERT Company VALUES('CM0003','重庆中环快递有限公司','重庆渝北区龙山路3号', '401147','赵彦','15854782500',null,'cqzhonghuan@163.com')
INSERT Company VALUES('CM0004','福州圆通快递','福建省厦门市北路23号','361000',     '陈阳', ' 0591-87325660','0591-87653656','fuyuantong@163.com')
INSERT Company VALUES('CM0005','杭州八方物流有限公司','浙江省杭州市','330046','李霞',' 0571-86714051','0571-86714046','master@hz8856.com')
INSERT Company VALUES('CM0006','陕西运逸物流有限公司','西安经济开发区凤城路', '710016','李琪','029-81973555','0291-86513141','sxyunyi@126.com')
GO

/*创建配送单表  11*/
CREATE TABLE ShipSheet (
   orderNo     char(15)        NOT NULL,  /*订单编号*/
   shipNo      char(4)         NOT NULL,  /*配送单号*/
   receiver      varchar(20)   NOT NULL, /*收货人*/
   shipAddress  varchar(40)    NOT NULL,  /*送货地址*/
   zipCode     char(6)         NOT NULL,   /*邮政编码*/
   shipTel      varchar(15),              /*联系电话*/
   separateFlag  char(1)      NOT NULL,   /*是否拆送, ‘Y’-为拆送, ‘N’-拆送*/
   invoiceNo    char(10)       NULL,   /*发票编号*/
   shipDate     datetime       NULL,   /*配送日期*/
   shipState     char(1)       NOT NULL,   /*配送状态, ‘A’—未送货，‘B’—已送货，‘C’—已送到*/
   companyNo   char(12)        NULL,   /*配送公司编号*/
   employeeNo  char(10)        NULL,   /*职员编号*/
   PRIMARY KEY (shipNo, orderNo),
   FOREIGN KEY (orderNo) REFERENCES OrderSheet(orderNo),
   FOREIGN KEY (companyNo) REFERENCES Company(companyNo),
   FOREIGN KEY (employeeNo) REFERENCES Employee(employeeNo)
)
GO
/*ShipSheet插入数据*/
INSERT ShipSheet VALUES ('200801010000001','001','张明','江西财大麦园静庐A613','330032','15954782541','Y','IV00000001','20080108','C','CM0001','E000000001')
INSERT ShipSheet VALUES ('200801010000001','002','万磊','庐山南大道107号','330030', '0791-2151386','Y', 'IV00000002','20080204','C','CM0002','E000000002')
INSERT ShipSheet VALUES ('200801010000001','003','李琼', '青山湖西区519','201411','15854782500','Y','IV00000003','20080215','C','CM0003','E000000006' )
INSERT ShipSheet VALUES ('200801010000002','001','周艳', '南京路天赐良缘1单元','330003','0591-87325660','N','IV00000004','20080105','C','CM0006','E000000003')
INSERT ShipSheet VALUES ('200801010000003','001','叶雷','万达星城' ,'401147', '0571-86714051','Y', 'IV00000005','20080103','B','CM0001','E000000004')
INSERT ShipSheet VALUES ('200801010000003','002','黄宇','珞瑜路117号','330046','029-81973555','N','IV00000006','20080118','C','CM0002','E000000005')
GO

/*创建配送明细表  12*/
CREATE TABLE ShipBook(
   orderNo    char(15)    NOT NULL,  /*订单编号*/
   shipNo     char(4)   NOT NULL,    /*配送单号*/
   ISBN      char(17)   NOT NULL,    /*图书编号*/
   shipQuantity int     NOT NULL,	  /*配送数量*/
   PRIMARY KEY (shipNo, orderNo, ISBN),
   FOREIGN KEY (orderNo) REFERENCES OrderSheet(orderNo),
   FOREIGN KEY (ISBN) REFERENCES Book(ISBN)
)
GO
/*ShipBook表插入数据*/
INSERT ShipBook VALUES ('200801010000001','001', '97871110756601111',2)
INSERT ShipBook VALUES ('200801010000001','002', '97872000633321111',1)
INSERT ShipBook VALUES ('200801010000001','003', '97871112160631111',1)
INSERT ShipBook VALUES ('200801010000002','001' ,'97871110756601111',1)
INSERT ShipBook VALUES ('200801010000003','001', '97871210403441111',2)
INSERT ShipBook VALUES ('200801010000003','001', '97871210664431111',5)
GO

/*创建采购单表  13*/
CREATE TABLE PurchaseSheet(
   purchaseNo   char(15)   PRIMARY KEY NOT NULL,  /*采购单号*/
   purDate      datetime   NOT NULL,                /*采购日期*/
   purAmount   numeric    NOT NULL,                /*采购总金额*/
   storeFlag     char(1)    NOT NULL,                /*是否入库, ‘Y’-入库, ‘N’-未入库*/
   employeeNo  char(10)   NOT NULL,                /*职员编号*/
   pressNo      char(12)   NOT NULL,                /*出版社编号*/
   FOREIGN KEY (employeeNo) REFERENCES Employee(employeeNo),
   FOREIGN KEY (pressNo)    REFERENCES Press(pressNo)
)
GO
/*PurchaseSheet表插入数据*/
INSERT PurchaseSheet VALUES ('P20080101000001','20080101','1000','Y','E000000001','7-102')
INSERT PurchaseSheet VALUES ('P20080101000002','20080101','1020','Y','E000000002','7-107')
INSERT PurchaseSheet VALUES ('P20080101000003','20080101','1658','Y','E000000003','7-102')
INSERT PurchaseSheet VALUES ('P20080101000004','20080101','566' ,'Y','E000000004','7-111')
INSERT PurchaseSheet VALUES ('P20080101000005','20080101','489', 'Y','E000000005','7-1210')
INSERT PurchaseSheet VALUES ('P20080101000006','20080101','2000','Y','E000000006','7-5327')
GO

/*创建采购明细表  14*/
CREATE TABLE PurchaseBook(
   purchaseNo  char(15)   NOT NULL,   /*采购单号*/
   serialNo    char(4)     NOT NULL,   /*序号*/
   ISBN        char(17)    NOT NULL,  /*图书编号*/
   purQuantity int        NOT NULL,    /*采购数量*/
   purPrice    numeric    NOT NULL,   /*采购单价*/
   storeQuantity int      NOT NULL,     /*已入库数量*/
   PRIMARY KEY (purchaseNo, serialNo,ISBN),
   FOREIGN KEY (purchaseNo) REFERENCES PurchaseSheet(purchaseNo),
   FOREIGN KEY (ISBN)       REFERENCES Book(ISBN)
)
GO
/*PurchaseBook表插入数据*/
INSERT PurchaseBook VALUES ('P20080101000001','0001','97871110756601111',2,45,2)
INSERT PurchaseBook VALUES ('P20080101000002','0002','97871112160631111',3,28,3)
INSERT PurchaseBook VALUES ('P20080101000003','0003','97871151756251111',3,59,3)
INSERT PurchaseBook VALUES ('P20080101000004','0004','97871210403441111',2,55,2)
INSERT PurchaseBook VALUES ('P20080101000005','0005','97871210664431111',1,59,1)
INSERT PurchaseBook VALUES ('P20080101000006','0006','97875327469341111',5,15,5)
GO

/*创建入库单表  15*/
CREATE TABLE StoreSheet(
   purchasNo     char(15)   NOT NULL,  /*采购单号*/
   storeNo       char(4)    NOT NULL,   /*入库单号*/
   storeDate      datetime   NOT NULL,  /*入库日期*/
   sEmployeeNo  char(10)   NOT NULL,   /*入库职员编号*/
   aEmployeeNo  char(10)   NOT NULL,   /*验收职员编号*/
   PRIMARY KEY (purchasNo, storeNo),
   FOREIGN KEY (sEmployeeNo)REFERENCES Employee(employeeno),
   FOREIGN KEY (aEmployeeNo)REFERENCES Employee(employeeno)
)
GO

/*StoreSheet表插入数据*/
INSERT StoreSheet VALUES ('P20080101000001','S001','20080108','E000000001','E000000002')
INSERT StoreSheet VALUES ('P20080101000002','S002','20080108','E000000002','E000000002')
INSERT StoreSheet VALUES ('P20080101000003','S003','20080108','E000000001','E000000002')
INSERT StoreSheet VALUES ('P20080101000004','S004','20080108','E000000001','E000000004')
INSERT StoreSheet VALUES ('P20080101000005','S005','20080108','E000000002','E000000001')
INSERT StoreSheet VALUES ('P20080101000006','S006','20080108','E000000003','E000000001')
GO

/*创建入库明细表  16*/
CREATE TABLE StoreBook(
   purchasNo  char(15)   NOT NULL,    /*采购单号*/
   storeNo     char(4)    NOT NULL,    /*入库单号*/
   ISBN       char(17)   NOT NULL,    /*图书编号*/
   quantity     int 	    NOT NULL,    /*入库数量*/
   PRIMARY KEY (purchasNo, storeNo, ISBN),
   FOREIGN KEY (purchasNo,storeNo) REFERENCES StoreSheet (purchasNo,storeNo),  
   FOREIGN KEY (ISBN) REFERENCES Book(ISBN)
)
GO
/*StoreSheet表插入数据*/
INSERT StoreBook VALUES ('P20080101000001','S001','97871110756601111',2)
INSERT StoreBook VALUES ('P20080101000002','S002','97871110756601111',3)
INSERT StoreBook VALUES ('P20080101000003','S003','97871210403441111',3)
INSERT StoreBook VALUES ('P20080101000004','S004','97872000633321111',2)
INSERT StoreBook VALUES ('P20080101000005','S005','97875327469341111',5)
INSERT StoreBook VALUES ('P20080101000006','S006','97871151756251111',6)
GO