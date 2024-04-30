import { Button, Result } from "antd";
import Link from "next/link";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    status: "success" | "error";
    id: number;
  };
}) {
  const title = {
    success: "购买成功！",
    error: "购买失败！",
  };

  return (
    <main>
      <Result
        status={searchParams?.status}
        title={searchParams && title[searchParams.status]}
        subTitle={
          searchParams?.status === "success" &&
          `订单${searchParams.id}已收到，我们将会在15个工作日内尽快处理。`
        }
        extra={[
          <Link href={"/"} key={"homepage"}>
            <Button type="primary">返回主页</Button>
          </Link>,
        ]}
      />
    </main>
  );
}
