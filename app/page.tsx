import { addBook, getBookList } from "@/app/lib/action/book";
import { addPress, getAllPress } from "@/app/lib/action/press";
import { Button } from "antd";

export default async function Home() {
  // await getBookList();

  const press = await getAllPress();

  async function handleAddPress() {
    "use server";
    await addPress({
      pressNo: "7-111",
      pressName: "机械工业出版社",
      address: "北京百万庄大街22号",
      zipCode: "10037",
      contactPerson: "代小姐",
      telephone: "010-88379639",
      fax: "010-68990188",
      email: "service@book.com",
    });
  }

  async function handleAddBook() {
    "use server";
    await addBook({
      ISBN: "97871112160631111",
      bookTitle: "Linux 网络技术",
      author: "王波",
      publishDate: new Date("2007-07-01"),
      version: 1,
      category: "计算机/网络",
      stockNumber: 20,
      price: 28,
      bookDiscount: 0.9,
      introduction: "从Linux操作系统基础入手...",
      catalog: "第1章 概述与安装,第2章 命令与示例...",
      pressNo: "7-111",
    });
  }

  return (
    <div>
      <form action={handleAddPress}>
        <Button htmlType={"submit"}>Add Press</Button>
      </form>
      <form action={handleAddBook}>
        <Button htmlType={"submit"}>Add Book</Button>
      </form>
      {press.map((p) => (
        <div key={p.pressNo}>
          <p>Press Name: ${p.pressName}</p>
          <p>Press No: ${p.pressNo}</p>
        </div>
      ))}
    </div>
  );
}
