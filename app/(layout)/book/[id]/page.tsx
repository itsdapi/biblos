import { getBookDetailById } from "@/app/lib/action/book";
import { notFound } from "next/navigation";
import { Image } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import moment from "moment";
import PurchaseButton from "@/app/ui/components/cart/purchase-button";
import Wrapper from "@/app/ui/content-wrapper";
import Comment from "@/app/ui/components/comment/comment";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const book = await getBookDetailById(id);
  if (!book) {
    notFound();
  }

  return (
    <main className={"space-y-4 pb-20"}>
      <Wrapper className={"flex-col lg:flex-row"}>
        <Image
          src={book.coverUrl}
          alt={`${book.bookTitle}封面`}
          className={"rounded-md w-[30rem]"}
          radius={"none"}
        />
        <div className={"flex flex-col justify-between p-4 space-y-4"}>
          <div className={"space-y-4"}>
            <div className={"space-y-2"}>
              <p className={"text-4xl font-bold"}>{book.bookTitle}</p>
              <p className={""}>{book.author}</p>
              <p className={"text-muted-foreground font-light"}>
                {book.introduction}
              </p>
              <p className={"text-red-500 font-bold text-5xl"}>¥{book.price}</p>
              <span className={"text-sm"}>库存 </span>
              <span>{book.stockNumber}</span>
            </div>
            <Chip>{book.category}</Chip>
          </div>
          <PurchaseButton id={book.id} />
        </div>
      </Wrapper>
      <Wrapper className={"flex flex-col space-y-8"}>
        <Desc title={"ISBN"} content={book.ISBN} />
        <Desc title={"版本"} content={book.version} />
        <Desc
          title={"出版日期"}
          content={moment(book.publishDate).format("YYYY年MM月DD日")}
        />
        <Desc title={"目录"} content={book.catalog} />
        <Desc title={"描述"} content={book.introduction} />
      </Wrapper>
      <Wrapper>
        <Comment postId={book.id} />
      </Wrapper>
    </main>
  );
}

function Desc({
  title,
  content,
}: {
  title: string;
  content?: string | number;
}) {
  return (
    <div className={"space-y-2"}>
      <p className={"text-2xl font-bold"}>{title}</p>
      <p>{content}</p>
    </div>
  );
}
