import { Image } from "@nextui-org/react";
import Wrapper from "@/app/ui/content-wrapper";
import { FaPhone, FaWeibo } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function AboutPage() {
  return (
    <main className={"space-y-4 pb-20"}>
      <Wrapper className={"flex flex-col items-center justify-center"}>
        <div className={"py-10 text-center space-y-2"}>
          <h1 className={"text-3xl font-bold"}>
            欢迎来到 biblos &reg; <br /> 您的理想数字图书馆伙伴
          </h1>
          <p>
            我们致力于提供一个全面、用户友好的在线平台,让阅读和知识管理变得前所未有的便捷。
          </p>
        </div>
      </Wrapper>
      <Wrapper className={"flex flex-col md:flex-row gap-5"}>
        <div className={"flex-1 space-y-4"}>
          <p className={"text-3xl font-bold"}>关于biblos &reg;</p>
          <p>
            我们希望建立一个连接读者、作者和出版社的生态系统，促进知识的交流和传播。加入我们的阅读社区，与同好分享心得，参与讨论，共同探索文学的无限可能。在这里，你不仅可以发现和分享好书，还能直接与作者互动，了解创作背后的故事。出版社也将参与其中，提供最新出版信息和独家活动，让你第一时间掌握书界动态。
          </p>
          <p>
            我们的平台致力于打造一个多元化的阅读环境，不论你喜欢小说、非小说、学术著作还是科幻奇幻，都能找到志同道合的伙伴。通过我们的推荐系统，你可以轻松找到符合自己口味的新书，同时也能将自己喜爱的作品推荐给他人。
          </p>
        </div>
        <div className={"flex-1"}>
          <Image
            alt={"关于我们的一张图片"}
            src={
              "https://biblos-image-r2.itsp3.space/v2-8b39c60fd3d49a4b31e35acd8217a16d_1440w.webp"
            }
          />
        </div>
      </Wrapper>
      <Wrapper className={"flex flex-col"}>
        <p className={"text-3xl font-bold"}>联系我们</p>
        <p>如果您有任何疑问或建议,欢迎通过以下方式联系我们</p>
        <div className={"space-y-2"}>
          <div className={"flex flex-row items-center space-x-4"}>
            <FaPhone />
            <span>505-842-5662</span>
          </div>
          <div className={"flex flex-row items-center space-x-4"}>
            <MdOutlineEmail />
            <span>service@biblos.com</span>
          </div>
          <div className={"flex flex-row items-center space-x-4"}>
            <FaWeibo />
            <span>biblos</span>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
