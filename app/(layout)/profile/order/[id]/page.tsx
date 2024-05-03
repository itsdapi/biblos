import { getAllOrderItemByOrderId } from "@/app/lib/action/order";
import usePageOptions from "@/app/lib/hook/use-page-option";
import OrderDetailTable from "@/app/ui/components/user/order-detail-table";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { page?: number };
}) {
  const [skip, limit] = usePageOptions(searchParams?.page, 10);
  const id = Number(params.id);
  const [{ payload, total }] = await Promise.all([
    getAllOrderItemByOrderId(id, skip, limit),
  ]);
  return (
    <main className={"pb-20"}>
      <OrderDetailTable
        orderItems={payload}
        totalItem={total}
        itemPerPage={limit}
      />
    </main>
  );
}
