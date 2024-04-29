import { config } from "@/app.config";
import ManagePressTable from "@/app/ui/components/manage/table/manage-press-table";
import { getAllPress } from "@/app/lib/action/press";
import TableHeader from "@/app/ui/table-header";
import Pagination from "@/app/ui/pagination";

export default async function PressManage({
  searchParams,
}: {
  searchParams?: { page?: number };
}) {
  const itemPerPage = 8;
  const currentPage = searchParams?.page || 1;
  const skip = (currentPage - 1) * itemPerPage;
  const [{ total, payload }] = await Promise.all([
    getAllPress(skip, itemPerPage),
  ]);
  const { adminPress, addPress } = config.path;

  return (
    <div className={"space-y-4 w-full"}>
      <TableHeader
        toPath={addPress}
        currPath={adminPress}
        text={"添加出版社"}
      />
      <ManagePressTable press={payload} />
      <Pagination totalItems={total} itemPerPage={itemPerPage} />
    </div>
  );
}
