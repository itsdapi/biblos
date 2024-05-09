"use client";

import { Button, Input } from "antd";
import { Avatar } from "@nextui-org/react";
import { IUser } from "@/app/lib/type";
import { SendOutlined } from "@ant-design/icons";
import useExecutor from "@/app/lib/hook/use-executor";
import { useState } from "react";
import { isBlank } from "@/app/lib/utils";
import toast from "react-hot-toast";
import { postComment } from "@/app/lib/action/comment";
import usePostComment from "@/app/lib/hook/use-post-comment";

export default function CommentPrompt({
  user,
  postId,
}: {
  user?: IUser;
  postId: number;
}) {
  const { loading, handleSubmit, setInput, input } = usePostComment(
    postId,
    user,
  );

  return (
    <div className={"w-full space-y-4"}>
      <div className={"flex flex-row md:space-x-4"}>
        <Avatar
          src={user?.image ? user.image : ""}
          size={"lg"}
          className={"hidden md:block"}
        />
        <Input.TextArea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className={"w-full"}
          placeholder={"发一条友善的评论吧^^"}
          rows={4}
        />
      </div>
      <div className={"flex flex-row justify-end"}>
        <Button
          type={"primary"}
          icon={<SendOutlined />}
          onClick={handleSubmit}
          loading={loading}
        >
          发布
        </Button>
      </div>
    </div>
  );
}
