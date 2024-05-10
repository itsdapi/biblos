import { Suspense } from "react";
import { IndexBookList } from "@/app/ui/components/book-list";
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
            className={"aspect-[4/1] w-full rounded-md border"}
            classNames={{ wrapper: "!max-w-full" }}
            alt={"首页轮播图"}
            radius={"none"}
          />
        ))}
      </Carousel>
      <Suspense fallback={<LoadingScreen />}>
        <IndexBookList />
      </Suspense>
    </main>
  );
}
