import { config } from "@/app.config";
import ManageExpressTable from "@/app/ui/components/manage/table/manage-express-table";
import { getAllExpress } from "@/app/lib/action/express";
import TableHeader from "@/app/ui/table-header";
import Pagination from "@/app/ui/pagination";
import usePageOptions from "@/app/lib/hook/use-page-option";
import { getAllUser } from "@/app/lib/action/user";
import ManageUserTable from "@/app/ui/components/manage/table/manage-user-table";

export default async function ExpressManage({
  searchParams,
}: {
  searchParams?: { page?: number };
}) {
  const [skip, limit] = usePageOptions(searchParams?.page, 8);
  const [{ total, payload }] = await Promise.all([getAllUser(skip, limit)]);
  const { adminUser } = config.path;

  return (
    <div className={"space-y-4 w-full"}>
      <TableHeader currPath={adminUser} />
      <ManageUserTable users={payload} />
      <Pagination totalItems={total} itemPerPage={limit} />
    </div>
  );
}
