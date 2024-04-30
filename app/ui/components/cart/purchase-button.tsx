"use client";

import { InputNumber } from "antd";
import { Button } from "@nextui-org/react";
import { MdAddShoppingCart } from "react-icons/md";
import { useState } from "react";
import { saveCart } from "@/app/lib/action/cart";
import useExecutor from "@/app/lib/hook/use-executor";

export default function PurchaseButton({ id }: { id: number }) {
  const [quantity, setQuantity] = useState(1);
  const executor = useExecutor();
  const handlePurchase = async () => {
    await executor(saveCart(id, quantity), "加入购物车");
  };

  return (
    <div className={"flex flex-col space-y-2"}>
      <p className={"text-sm font-light"}>购买数量</p>
      <InputNumber
        min={1}
        max={10}
        defaultValue={1}
        onChange={(count) => setQuantity(count ? count : 0)}
      />
      <Button
        variant={"ghost"}
        color={"primary"}
        radius={"full"}
        className={"w-fit"}
        startContent={<MdAddShoppingCart />}
        onClick={handlePurchase}
      >
        添加至购物车
      </Button>
    </div>
  );
}
