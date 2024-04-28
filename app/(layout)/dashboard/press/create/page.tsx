import PressForm from "@/app/ui/components/manage/form/press-form";
import BookForm from "@/app/ui/components/manage/form/book-form";
import CreateHeader from "@/app/ui/create-header";

export default async function BookCreate() {
  return (
    <main className={"w-full"}>
      <CreateHeader>添加出版社</CreateHeader>
      <PressForm />
    </main>
  );
}
