"use server";
import { revalidatePath } from "next/cache";

noStore();

import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
import { getDBConnection } from "@/app/lib/db/connection";
import { Comment } from "@/app/lib/db/entities/Comment";
import { config } from "@/app.config";

export async function getCommentRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(Comment);
}

export async function getCommentsById(postId: number) {
  const repo = await getCommentRepository();
  const comments = JSON.stringify(
    await repo.find({
      where: { postId },
      order: {
        id: "DESC",
      },
    }),
  );
  return JSON.parse(comments) as Comment[];
}

export async function postComment({
  content,
  postId,
  userId,
  parentId,
}: {
  content: string;
  userId: string;
  postId: number;
  parentId?: number;
}) {
  const repo = await getCommentRepository();
  const comment = repo.create({
    content,
    postId,
    userId,
    parentId,
  });
  await repo.save(comment);
  revalidatePath(`${config.path.bookDetail}/${postId}`);
  return;
}
