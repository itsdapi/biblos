import { Button } from "antd";
import { Book } from "@/app/lib/db/entities/Book";
import { addOrEditBook } from "@/app/lib/action/book";
import LoadingScreen from "@/app/ui/loading-screen";

export default function Test() {
  // const books: Book[] = [
  //   {
  //     id: 1,
  //     ISBN: "978-3-16-148410-0",
  //     bookTitle: "深入理解计算机系统",
  //     author: "Randal E. Bryant",
  //     publishDate: new Date("2021-03-15"),
  //     version: 3,
  //     category: "计算机科学",
  //     stockNumber: 120,
  //     price: 85.5,
  //     bookDiscount: 0.1,
  //     introduction:
  //       "本书全面介绍了计算机系统的重要概念和结构，帮助读者理解现代计算机的基本原理。",
  //     catalog:
  //       "第1章 计算机系统漫游\n第2章 信息的表示和处理\n第3章 程序的机器级表示\n第4章 处理器体系结构\n第5章 优化程序性能\n第6章 存储器层次结构",
  //     coverUrl: "https://img3m7.ddimg.cn/48/0/24106647-1_w_1691123426.jpg",
  //     pressId: 1,
  //   },
  //   {
  //     id: 2,
  //     ISBN: "978-0-13-409266-9",
  //     bookTitle: "操作系统原理",
  //     author: "Andrew S. Tanenbaum",
  //     publishDate: new Date("2020-08-24"),
  //     version: 7,
  //     category: "操作系统",
  //     stockNumber: 150,
  //     price: 99.0,
  //     bookDiscount: 0.15,
  //     introduction:
  //       "这本书详细讲述了操作系统的设计与实现，包括进程管理、内存管理、文件系统、安全性和网络通信等。",
  //     catalog:
  //       "第1章 引言\n第2章 进程和线程\n第3章 内存管理\n第4章 文件系统\n第5章 输入/输出\n第6章 死锁",
  //     coverUrl: "https://img3m7.ddimg.cn/55/4/29409787-1_w_2.jpg",
  //     pressId: 1,
  //   },
  //   {
  //     id: 3,
  //     ISBN: "978-4-87311-907-9",
  //     bookTitle: "算法导论",
  //     author: "Thomas H. Cormen",
  //     publishDate: new Date("2019-05-10"),
  //     version: 4,
  //     category: "算法",
  //     stockNumber: 200,
  //     price: 115.0,
  //     bookDiscount: 0.2,
  //     introduction:
  //       "本书系统地介绍了计算机算法的理论和实际应用，适合所有层次的读者学习。",
  //     catalog:
  //       "第1部分 基础知识\n第2部分 排序和顺序统计\n第3部分 数据结构\n第4部分 高级设计和分析技术\n第5部分 高级数据结构和算法",
  //     coverUrl: "https://img3m9.ddimg.cn/96/11/22927209-1_w_7.jpg",
  //     pressId: 2,
  //   },
  //   {
  //     id: 4,
  //     ISBN: "978-1-60309-047-6",
  //     bookTitle: "心理学概论",
  //     author: "David G. Myers",
  //     publishDate: new Date("2022-01-15"),
  //     version: 12,
  //     category: "心理学",
  //     stockNumber: 80,
  //     price: 60.0,
  //     bookDiscount: 0.05,
  //     introduction:
  //       "这本书为读者提供了心理学领域的全面介绍，涵盖了认知、情感、行为等多个方面。",
  //     catalog:
  //       "第1章 心理学的科学\n第2章 研究方法\n第3章 生物学基础\n第4章 感觉与知觉\n第5章 学习与记忆\n第6章 思考与智力",
  //     coverUrl: "https://img3m2.ddimg.cn/74/33/23779082-1_w_1.jpg",
  //     pressId: 4,
  //   },
  //   {
  //     id: 5,
  //     ISBN: "978-2-266-11156-7",
  //     bookTitle: "现代艺术简史",
  //     author: "H. H. Arnason",
  //     publishDate: new Date("2021-11-20"),
  //     version: 6,
  //     category: "艺术",
  //     stockNumber: 95,
  //     price: 75.0,
  //     bookDiscount: 0.1,
  //     introduction:
  //       "本书探索了从19世纪到21世纪的现代艺术运动，包括印象派、立体主义和现代主义等。",
  //     catalog:
  //       "第1章 印象派\n第2章 立体主义\n第3章 表现主义\n第4章 抽象主义\n第5章 现代主义与后现代主义",
  //     coverUrl: "https://img3m1.ddimg.cn/87/22/1220356851-1_w_2.jpg",
  //     pressId: 3,
  //   },
  //   {
  //     id: 6,
  //     ISBN: "978-3-16-148410-1",
  //     bookTitle: "量子物理入门",
  //     author: "Richard P. Feynman",
  //     publishDate: new Date("2023-02-10"),
  //     version: 1,
  //     category: "物理",
  //     stockNumber: 110,
  //     price: 90.0,
  //     bookDiscount: 0.2,
  //     introduction:
  //       "理查德·费曼以其独特的风格介绍了量子物理的基本概念和原理，适合初学者和高级读者。",
  //     catalog:
  //       "第1章 量子行为\n第2章 不确定性原理\n第3章 波函数\n第4章 原子理论\n第5章 核物理",
  //     coverUrl: "https://img3m6.ddimg.cn/84/18/11647653816-1_w_1704715947.jpg",
  //     pressId: 2,
  //   },
  // ];

  const books: Book[] = [
    {
      id: 7,
      ISBN: "978-0-12-374255-1",
      bookTitle: "微观经济学原理",
      author: "N. Gregory Mankiw",
      publishDate: new Date("2022-05-01"),
      version: 8,
      category: "经济学",
      stockNumber: 130,
      price: 65.0,
      bookDiscount: 0.1,
      introduction:
        "本书通过简明扼要的语言解释了微观经济学的核心概念和理论，适合经济学初学者。",
      catalog:
        "第1章 经济学的十大原理\n第2章 供求与市场均衡\n第3章 消费者行为\n第4章 生产者行为\n第5章 市场结构与完全竞争",
      pressId: 2,
    },
    {
      id: 8,
      ISBN: "978-0-13-600613-8",
      bookTitle: "全球历史概览",
      author: "William J. Duiker",
      publishDate: new Date("2023-03-23"),
      version: 5,
      category: "历史",
      stockNumber: 75,
      price: 80.0,
      bookDiscount: 0.15,
      introduction:
        "这本书提供了从古代文明到现代社会的全球历史发展概览，强调了跨文化交流和冲突的重要性。",
      catalog:
        "第1章 早期文明\n第2章 中世纪的世界\n第3章 文艺复兴与启蒙\n第4章 现代初期的全球化\n第5章 二十世纪的世界",
      pressId: 4,
    },
    {
      id: 9,
      ISBN: "978-1-57230-561-8",
      bookTitle: "认知行为疗法基础",
      author: "Judith S. Beck",
      publishDate: new Date("2022-09-15"),
      version: 2,
      category: "心理治疗",
      stockNumber: 90,
      price: 55.0,
      bookDiscount: 0.2,
      introduction:
        "本书由认知行为疗法的领军人物撰写，详细介绍了CBT的理论基础和临床应用。",
      catalog:
        "第1章 认知行为疗法概述\n第2章 评估与诊断\n第3章 治疗计划\n第4章 实施技术\n第5章 处理情绪障碍",
      pressId: 3,
    },
  ];

  async function handleClick() {
    "use server";
    for (let i = 0; i < 3; i++) {
      await addOrEditBook(books[i]);
    }
  }

  return (
    <form action={handleClick}>
      <Button htmlType={"submit"}>添加书本</Button>
      <LoadingScreen />
    </form>
  );
}
