import {Suspense} from "react";
import BookList from "@/app/ui/components/book-list";

export default async function Home() {
  return (
    <main className={"space-y-5"}>
      <Suspense fallback={<div>Loading...</div>}>
        <BookList/>
      </Suspense>
    </main>
  );
}
