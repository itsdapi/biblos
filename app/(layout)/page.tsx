import { Suspense } from "react";
import BookList from "@/app/ui/components/book-list";
import LoadingScreen from "@/app/ui/loading-screen";

export default async function Home() {
  return (
    <main className={"space-y-5"}>
      <Suspense fallback={<LoadingScreen />}>
        <BookList />
      </Suspense>
    </main>
  );
}
