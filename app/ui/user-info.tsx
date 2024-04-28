import { User } from "@nextui-org/user";
import { DefaultSession } from "next-auth";
import { Tooltip } from "@nextui-org/react";
import UserDetailPopover from "@/app/ui/components/user-detail-popover";
import { IUser } from "@/app/lib/type";

export default function UserInfo({ user }: { user?: IUser }): JSX.Element {
  return (
    <div>
      {user && (
        <Tooltip
          content={<UserDetailPopover user={user} />}
          placement={"bottom-end"}
        >
          <User
            name={user.name}
            description={user.email}
            avatarProps={{ src: user.image ? user.image : "" }}
          />
        </Tooltip>
      )}
    </div>
  );
}
