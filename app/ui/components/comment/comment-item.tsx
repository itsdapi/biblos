import { User } from "@nextui-org/user";
import { Comment } from "@/app/lib/db/entities/Comment";
import { getUserDetailById } from "@/app/lib/action/user";
import "moment/locale/zh-cn";
import moment from "moment";

export default async function CommentItem({ comment }: { comment: Comment }) {
  const user = await getUserDetailById(comment.userId);

  return (
    <div>
      <User
        name={user?.name}
        avatarProps={{
          src: user?.image || "",
          size: "sm",
        }}
      />
      <p className={"text-muted-foreground"}>{comment.content}</p>
      <p className={"text-muted-foreground/50 text-sm pt-3"}>
        {moment(comment.createdAt).fromNow()}
      </p>
    </div>
  );
}
