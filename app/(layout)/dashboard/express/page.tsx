import { config } from "@/app.config";
import ManageExpressTable from "@/app/ui/components/manage/table/manage-express-table";
import { getAllExpress } from "@/app/lib/action/express";
import TableHeader from "@/app/ui/table-header";
import Pagination from "@/app/ui/pagination";

export default async function ExpressManage({
  searchParams,
}: {
  searchParams?: { page?: number };
}) {
  const itemPerPage = 8;
  const currentPage = searchParams?.page || 1;
  const skip = (currentPage - 1) * itemPerPage;
  const [{ total, payload }] = await Promise.all([
    getAllExpress(skip, itemPerPage),
  ]);
  const { adminExpress, addExpress } = config.path;

  return (
    <div className={"space-y-4 w-full"}>
      <TableHeader
        toPath={addExpress}
        currPath={adminExpress}
        text={"添加快递公司"}
      />
      <ManageExpressTable express={payload} />
      <Pagination totalItems={total} itemPerPage={itemPerPage} />
    </div>
  );
}
