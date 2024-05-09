import { IconLoading } from "@/app/ui/icons";
import { Spin } from "antd";

export default function LoadingScreen() {
  return (
    <div
      className={
        "w-full h-full flex-col space-y-4 flex justify-center items-center p-10"
      }
    >
      <Spin />
    </div>
  );
}
