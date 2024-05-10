import CommentPrompt from "@/app/ui/components/comment/comment-prompt";
import { auth } from "@/auth";
import { IUser } from "@/app/lib/type";
import CommentItem from "@/app/ui/components/comment/comment-item";
import { Divider, Empty } from "antd";
import { getCommentsById } from "@/app/lib/action/comment";

export default async function Comment({ postId }: { postId: number }) {
  const user = (await auth())?.user as IUser | undefined;
  const [comments] = await Promise.all([getCommentsById(postId)]);
  return (
    <div className={"w-full"}>
      <h1 className={"text-3xl font-bold pb-5"}>评论</h1>
      <CommentPrompt user={user} postId={postId} />
      {comments.length !== 0 ? (
        <Divider />
      ) : (
        <Empty description={<p>还没有评论</p>} />
      )}
      <div className={"px-5"}>
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <CommentItem comment={comment} />
            {index !== comments.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  );
}
