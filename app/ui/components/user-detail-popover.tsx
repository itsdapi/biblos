import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar, Button } from "@nextui-org/react";
import { DefaultSession } from "next-auth";
import Link from "next/link";
import { Progress, ProgressProps } from "antd";
import { IUser, Role } from "@/app/lib/type";
import { Chip } from "@nextui-org/chip";
import { getLevelByXp } from "@/app/lib/action/user";
import { getLevelDefinition } from "@/app/lib/action/setting";
import { config } from "@/app.config";

export default async function UserDetailPopover({ user }: { user?: IUser }) {
  const xp = user ? user.xp : 0;
  const balance = user ? user.balance : 0;
  const level = await getLevelByXp(xp);
  const levelThresholds = await getLevelDefinition();
  const conicColors: ProgressProps["strokeColor"] = {
    "0%": "#87d068",
    "50%": "#ffe58f",
    "100%": "#ffccc7",
  };

  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between space-x-5">
        <div className="flex gap-3 items-center">
          <Avatar
            isBordered
            radius="full"
            size="lg"
            src={user?.image ? user.image : ""}
          />
          <div className="flex flex-col items-start justify-center space-y-1">
            <div>
              <h4 className="text-small font-semibold leading-none text-default-600">
                {user?.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                {user?.email}
              </h5>
            </div>
            <Chip size={"sm"} color={"success"} variant={"dot"}>
              {user && Role[user.role]}
            </Chip>
          </div>
        </div>
        <Link href={config.path.profile}>
          <Button color="primary" radius="full" size="sm">
            主页
          </Button>
        </Link>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">
          经验值
          <p
            className={`font-bold text-xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 
              w-fit text-transparent bg-clip-text`}
          >
            VIP {level + 1}
          </p>
          <Progress
            percent={
              levelThresholds
                ? Math.floor((xp / levelThresholds[level]) * 100)
                : 0
            }
            strokeColor={conicColors}
          />
          <p>
            {xp} / {levelThresholds && levelThresholds[level]}
          </p>
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">
            ¥{balance}
          </p>
          <p className="text-default-500 text-small">余额</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">4</p>
          <p className=" text-default-500 text-small">已购书目</p>
        </div>
      </CardFooter>
    </Card>
  );
}
