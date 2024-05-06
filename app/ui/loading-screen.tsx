import { IconLoading } from "@/app/ui/icons";

export default function LoadingScreen() {
  return (
    <div
      className={
        "w-full h-full flex-col space-y-4 flex justify-center items-center p-10"
      }
    >
      <IconLoading />
    </div>
  );
}
