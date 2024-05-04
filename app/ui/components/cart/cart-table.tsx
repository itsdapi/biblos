"use client";

import React, { Key, ReactNode, useEffect, useState } from "react";
import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { TCart } from "@/app/lib/type";
import { Button } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import {
  checkoutCart,
  deleteCartItem,
  getCart,
  populateCartItems,
} from "@/app/lib/action/cart";
import { calculateTotalPrice, rounded2digit } from "@/app/lib/utils";
import useExecutor from "@/app/lib/hook/use-executor";
import { Spinner } from "@nextui-org/spinner";
import { getUserDiscount } from "@/app/lib/action/user";
import { TbRefresh } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { config } from "@/app.config";

const columns = [
  { name: "物品", uid: "item" },
  { name: "数量", uid: "quantity" },
  { name: "书本折扣", uid: "bookDiscount" },
  { name: "单价", uid: "price" },
  { name: "总价", uid: "totalPrice" },
];

export default function CartTable() {
  const [carts, setCart] = useState<TCart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // 这个key是用来触发刷新的 通过setKey给key设置一个随机数 Math.random()来触发useEffect刷新
  const [key, setKey] = useState<Key>(0);
  const [loading, setLoading] = useState(false);
  const [userDiscount, setUserDiscount] = useState(1);
  const router = useRouter();
  const executor = useExecutor();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getCart();
      const cartData = await populateCartItems(data);
      setUserDiscount(await getUserDiscount());
      setCart(cartData);
      setTotalPrice(calculateTotalPrice(cartData, userDiscount));
      setLoading(false);
    };
    fetch();
  }, [key]);

  const handleCheckout = async () => {
    const orderId = await executor(checkoutCart(carts), "结算");
    router.push(`${config.path.checkoutSuccess}?status=success&id=${orderId}`);
  };

  const renderCell = React.useCallback(
    (cart: TCart, columnKey: React.Key) => {
      const quantity = cart.quantity;
      const item = cart.item;
      const price = item ? rounded2digit(item.price * item.discount) : 0;
      const itemTotalPrice = rounded2digit(price * quantity);

      switch (columnKey) {
        case "item":
          return (
            <div className={"flex flex-row shrink"}>
              <Image
                src={item?.coverUrl}
                alt={`${item?.name}封面`}
                className={"aspect-square w-36 object-cover"}
              />
              <div className={"flex flex-col justify-between p-4"}>
                <div className={"space-y-2"}>
                  <p className={"font-bold"}>{item?.name}</p>
                  <p className={"text-secondary-foreground font-light"}>
                    {item?.description}
                  </p>
                </div>
                <a
                  href={"#"}
                  onClick={async () => {
                    setKey(Math.random());
                    await executor(deleteCartItem(cart.id), "删除商品");
                  }}
                  className={
                    "text-primary-400 hover:underline hover:cursor-pointer"
                  }
                >
                  删除物品
                </a>
              </div>
            </div>
          );
        case "quantity":
          return <div>{quantity}</div>;
        case "bookDiscount":
          return <div>{item?.discount}</div>;
        case "price":
          return <div>¥{price}</div>;
        case "totalPrice":
          return <div>¥{itemTotalPrice}</div>;
      }
    },
    [userDiscount],
  );

  return (
    <div className={"space-y-4"}>
      <Table
        aria-label="我的购物车"
        shadow={"none"}
        radius={"md"}
        selectionMode="single"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={carts}
          isLoading={loading}
          loadingContent={<Spinner label="加载中..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div
        className={"bg-background rounded-xl py-4 px-8 flex flex-col space-y-4"}
      >
        <div className={"space-y-3"}>
          <DetailHeader>书本折扣</DetailHeader>
          <div>
            {carts.map((cart) => {
              return (
                <p key={cart.id} className={"space-x-2"}>
                  <span>{cart.item?.name}</span>
                  <span className={"text-gray-400 font-light"}>
                    *{cart.item?.discount}
                  </span>
                </p>
              );
            })}
          </div>
          <DetailHeader>用户折扣</DetailHeader>
          <p>{userDiscount}</p>
        </div>
        <div className={"flex flex-row justify-between items-center"}>
          <div className={"space-x-2"}>
            <span className={"text-sm font-light"}>总共</span>
            <span className={"line-through text-gray-400"}>
              ¥{rounded2digit(totalPrice / userDiscount)}
            </span>
            <span className={""}>¥{totalPrice}</span>
          </div>
          <div className={"flex flex-row items-center space-x-2"}>
            <Button
              icon={<TbRefresh />}
              onClick={() => setKey(Math.random())}
            />
            <Button icon={<ShoppingOutlined />} onClick={handleCheckout}>
              结账
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailHeader({ children }: { children: ReactNode }) {
  return <p className={"border-b mb-2 font-light text-gray-400"}>{children}</p>;
}
