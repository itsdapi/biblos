import React from "react";

interface BookItemProps extends React.ComponentProps<"div"> {
  title: string;
  price: number;
  stock: number;
  // cover: string;
}

export default function BookItem({ className, ...props }: BookItemProps) {
  return (
    <div className={"p-3 border"}>
      <p>书名：{props.title}</p>
      <p>价格：{props.price}</p>
      <p>库存：{props.stock}</p>
    </div>
  );
}
