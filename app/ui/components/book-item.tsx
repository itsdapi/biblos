import React from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { config } from "@/app.config";

interface BookItemProps extends React.ComponentProps<"div"> {
  bookId: number;
  title: string;
  price: number;
  stock: number;
  cover?: string | null;
}

export default function BookItem({ className, ...props }: BookItemProps) {
  return (
    <Link href={`${config.path.bookDetail}/${props.bookId}`}>
      <div
        className={
          "p-5 border space-y-4 rounded-md bg-background hover:shadow-bloom transition-shadow"
        }
      >
        <Image
          className={"w-56 aspect-[9/10] object-cover rounded-md mx-auto"}
          src={props.cover ? props.cover : ""}
          alt={`${props.title} cover`}
          radius={"none"}
        />
        <div className={""}>
          <p className={"text-xl line-clamp-1"}>{props.title}</p>
          <p className={"text-red-500 text-2xl font-bold"}>¥{props.price}</p>
          <p className={"text-sm font-light"}>库存 {props.stock}</p>
        </div>
      </div>
    </Link>
  );
}
