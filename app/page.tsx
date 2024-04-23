import { getBookList } from "@/app/lib/api/book";

export default async function Home() {
  await getBookList();

  return <div>main</div>;
}
