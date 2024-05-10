"use client";

import { Image } from "@nextui-org/react";
import { Button, InputNumber } from "antd";
import React, { useState } from "react";
import { CartIcon } from "@nextui-org/shared-icons";
import { TbPackageImport } from "react-icons/tb";
import { restockBook } from "@/app/lib/action/book";
import useExecutor from "@/app/lib/hook/use-executor";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";

interface BookItemProps extends React.ComponentProps<"div"> {
  bookId: number;
  title: string;
  price: number;
  stock: number;
  cover?: string | null;
}

export function RestockBookItem({ className, ...props }: BookItemProps) {
  const [count, setCount] = useState<number>(0);
  const executor = useExecutor();
  const handleRestock = async () => {
    await executor(restockBook(props.bookId, count), "进货");
  };

  return (
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
      <div>
        <p className={"text-xl line-clamp-1"}>{props.title}</p>
        <p className={"text-sm font-light pb-4"}>库存 {props.stock}</p>
        <div className={"flex flex-row items-center justify-between"}>
          <InputNumber
            className={"w-full"}
            min={0}
            max={999}
            defaultValue={0}
            onChange={(e) => setCount(e ? e : 0)}
          />
          <Button
            icon={<TbPackageImport size={16} />}
            onClick={handleRestock}
          />
        </div>
      </div>
    </div>
  );
}
