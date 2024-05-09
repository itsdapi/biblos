import { Suspense } from "react";
import BookList from "@/app/ui/components/book-list";
import LoadingScreen from "@/app/ui/loading-screen";
import { Carousel } from "antd";
import { Image } from "@nextui-org/react";
import { getIndexImages } from "@/app/lib/action/setting";

export default async function Home() {
  const [images] = await Promise.all([getIndexImages()]);

  return (
    <main className={"space-y-5"}>
      <Carousel>
        {images.map((img) => (
          <Image
            src={img}
            key={img}
            alt={"首页轮播图"}
            className={"rounded-md border"}
            radius={"none"}
          />
        ))}
      </Carousel>
      <Suspense fallback={<LoadingScreen />}>
        <BookList />
      </Suspense>
    </main>
  );
}
