import Link from "next/link";
import { Button } from "antd";
import { RxHome } from "react-icons/rx";

export default function HomeButton() {
  return (
    <Link href={"/"}>
      <Button icon={<RxHome />} />
    </Link>
  );
}
