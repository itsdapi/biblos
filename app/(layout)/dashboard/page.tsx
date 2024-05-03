import { redirect } from "next/navigation";
import { config } from "@/app.config";
import BookManage from "@/app/(layout)/dashboard/book/page";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: { page?: number };
}) {
  return <BookManage searchParams={searchParams} />;
}
