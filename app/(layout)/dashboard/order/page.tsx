import { config } from "@/app.config";
import TableHeader from "@/app/ui/table-header";
import Pagination from "@/app/ui/pagination";
import usePageOptions from "@/app/lib/hook/use-page-option";
import ManageOrderTable from "@/app/ui/components/manage/table/manage-order-table";
import { getAllOrder } from "@/app/lib/action/order";

export default async function ExpressManage({
  searchParams,
}: {
  searchParams?: { page?: number };
}) {
  const [skip, limit] = usePageOptions(searchParams?.page, 8);
  const [{ total, payload }] = await Promise.all([getAllOrder(skip, limit)]);
  const { adminOrder } = config.path;

  return (
    <div className={"space-y-4 w-full"}>
      <TableHeader currPath={adminOrder} />
      <ManageOrderTable order={payload} />
      <Pagination totalItems={total} itemPerPage={limit} />
    </div>
  );
}
