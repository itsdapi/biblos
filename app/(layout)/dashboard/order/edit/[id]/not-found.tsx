import Link from "next/link";
import { FaFaceFrown } from "react-icons/fa6";
import { config } from "@/app.config";

export default function NotFound() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-2">
      <FaFaceFrown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>找不到对应的订单</p>
      <Link
        href={`${config.path.adminExpress}`}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        带我回去
      </Link>
    </main>
  );
}
