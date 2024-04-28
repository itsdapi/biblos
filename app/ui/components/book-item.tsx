import React from "react";
import { Image } from "@nextui-org/react";

interface BookItemProps extends React.ComponentProps<"div"> {
  title: string;
  price: number;
  stock: number;
  cover?: string | null;
}

export default function BookItem({ className, ...props }: BookItemProps) {
  return (
    <div
      className={
        "p-5 border w-56 space-y-4 rounded-md hover:shadow-bloom transition-shadow"
      }
    >
      <Image
        className={"w-full aspect-[9/10] object-cover rounded-md"}
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
  );
}
