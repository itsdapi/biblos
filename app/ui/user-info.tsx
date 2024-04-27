import { User } from "@nextui-org/user";
import { DefaultSession } from "next-auth";

export interface UserInfoProps extends Pick<DefaultSession, "user"> {}

export default function UserInfo({ user }: UserInfoProps): JSX.Element {
  return user ? (
    <User
      name={user.name}
      description={user.email}
      avatarProps={{ src: user.image ? user.image : "" }}
    />
  ) : (
    <div>user undefined</div>
  );
}
