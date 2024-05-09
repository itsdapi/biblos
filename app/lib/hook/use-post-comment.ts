import { useCallback, useState } from "react";
import { isBlank } from "@/app/lib/utils";
import toast from "react-hot-toast";
import { postComment } from "@/app/lib/action/comment";
import { IUser } from "@/app/lib/type";
import useExecutor from "@/app/lib/hook/use-executor";

export default function usePostComment(postId: number, user?: IUser) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const executor = useExecutor();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    if (isBlank(input)) {
      toast.error("不能提交空评论哦");
      return;
    }
    if (!user || !user.id) {
      toast.error("用户未登陆");
      return;
    }
    await executor(
      postComment({ userId: user.id, content: input, postId }),
      "发布评论",
    );
    setLoading(false);
    setInput("");
  }, [input]);

  return {
    loading,
    setInput,
    input,
    handleSubmit,
  };
}
