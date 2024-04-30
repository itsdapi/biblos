import { Tag } from "antd";
import { OrderStatus } from "@/app/lib/type";

enum StatusColor {
  orange,
  volcano,
  cyan,
  blue,
  green,
  magenta,
  purple,
  red,
}

enum StatusText {
  "等待",
  "处理中",
  "已付款",
  "已发货",
  "已完成",
  "已退货",
  "已退款",
  "已取消",
}

export default function OrderStatusTag({ status }: { status: OrderStatus }) {
  return <Tag color={StatusColor[status]}>{StatusText[status]}</Tag>;
}
