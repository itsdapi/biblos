import OrderPage from "@/app/(layout)/profile/order/page";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: number };
}) {
  return <OrderPage searchParams={searchParams} />;
}
