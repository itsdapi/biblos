import CreateHeader from "@/app/ui/create-header";
import ExpressForm from "@/app/ui/components/manage/form/express-form";

export default async function ExpressCreate() {
  return (
    <main className={"w-full"}>
      <CreateHeader>添加快递公司</CreateHeader>
      <ExpressForm />
    </main>
  );
}
