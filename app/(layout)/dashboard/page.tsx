import CountBlock from "@/app/ui/components/count-block";
import {getBookCount} from "@/app/lib/action/book";
import {getPressCount} from "@/app/lib/action/press";
import ManageTabs from "@/app/ui/components/manage/manage-tabs";
import {getUserCount} from "@/app/lib/action/user";

export default async function Dashboard() {
  const [bookCount, pressCount, userCount] = await Promise.all([getBookCount(), getPressCount(), getUserCount()])


  return <div className={'space-y-6'}>
    <h1 className={'text-3xl border-b pb-3'}>控制面板</h1>
    <div className={'flex flex-row gap-4 border-b pb-6'}>
      <CountBlock count={bookCount} text={'书本数量'}/>
      <CountBlock count={pressCount} text={'出版社数量'}/>
      <CountBlock count={userCount} text={'用户数量'}/>
    </div>
    <ManageTabs/>

  </div>
}
