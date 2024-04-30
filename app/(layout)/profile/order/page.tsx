import { getAllOrder } from "@/app/lib/action/order";
import { auth } from "@/auth";
import { IUser } from "@/app/lib/type";
import OrderTable from "@/app/ui/components/user/order-table";
import usePageOptions from "@/app/lib/hook/use-page-option";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: number };
}) {
  const [skip, limit] = usePageOptions(searchParams?.page, 10);
  const user = (await auth())?.user as IUser;
  const userId = user.id;

  if (!userId) {
    return <div></div>;
  }

  const [{ payload, total }] = await Promise.all([
    getAllOrder(userId, skip, limit),
  ]);

  return <OrderTable orders={payload} totalItem={total} itemPerPage={limit} />;
}
