import Link from "next/link";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import RefreshButton from "@/app/ui/button/refresh-button";

export default function TableHeader(props: {
  toPath?: string;
  currPath: string;
  text?: string;
}) {
  return (
    <div className={"flex flex-row gap-3"}>
      {props.text && (
        <Link href={props.toPath!}>
          <Button type="primary" icon={<PlusOutlined />}>
            {props.text}
          </Button>
        </Link>
      )}
      <RefreshButton path={props.currPath} />
    </div>
  );
}
