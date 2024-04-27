import PressForm from "@/app/ui/components/manage/form/press-form";
import BookForm from "@/app/ui/components/manage/form/book-form";

export default async function BookCreate() {

  return (
    <main>
      <h1 className={"text-3xl font-bold py-3 sm:border-b sm:mb-10"}>
        添加出版社
      </h1>
      <PressForm />
    </main>
  );
}
