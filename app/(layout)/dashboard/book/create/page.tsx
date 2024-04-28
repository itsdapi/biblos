import BookForm from "@/app/ui/components/manage/form/book-form";
import { getAllPress } from "@/app/lib/action/press";
import CreateHeader from "@/app/ui/create-header";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { config } from "@/app.config";

export default async function BookCreate() {
  const [pressData] = await Promise.all([getAllPress(0, 10)]);

  return (
    <main className={"w-full"}>
      {/*<Breadcrumbs>*/}
      {/*  <BreadcrumbItem href={`${config.path.adminBook}`}>*/}
      {/*    书本管理*/}
      {/*  </BreadcrumbItem>*/}
      {/*</Breadcrumbs>*/}
      <CreateHeader>添加书本</CreateHeader>
      <BookForm press={pressData} />
    </main>
  );
}
