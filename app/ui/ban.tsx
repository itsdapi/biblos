import { FaLock } from "react-icons/fa";

export default function Ban() {
  return (
    <div
      className={
        "w-full h-screen flex justify-center items-center flex-col gap-4"
      }
    >
      <FaLock size={40} />
      <p className={"text-2xl"}>您没有权限</p>
    </div>
  );
}
