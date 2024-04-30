import CreateHeader from "@/app/ui/create-header";
import CartTable from "@/app/ui/components/cart/cart-table";

export default async function Page() {
  return (
    <main className={"pb-20"}>
      <CreateHeader>我的购物车</CreateHeader>
      <CartTable />
    </main>
  );
}
