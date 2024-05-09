import { notFound } from "next/navigation";
import CreateHeader from "@/app/ui/create-header";
import { getOrderById } from "@/app/lib/action/order";
import OrderForm from "@/app/ui/components/manage/form/order-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const [order] = await Promise.all([getOrderById(id)]);
  if (!order) {
    notFound();
  }

  return (
    <main className={"w-full"}>
      <CreateHeader>编辑订单</CreateHeader>
      <OrderForm order={order} />
    </main>
  );
}
