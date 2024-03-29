import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import { useGetMeQuery, useGetMyDashbaordQuery } from "../../redux/features/user/userApi";
import { IUserInfo } from "types/global.types";
// import tableDataCheck from "./variables/tableDataCheck";
// import tableDataComplex from "./variables/tableDataComplex";

const SellerDashboard = () => {



const {data}=useGetMeQuery<{data:{data:IUserInfo}}>(undefined);


const {data:dahboardInfo}=useGetMyDashbaordQuery(undefined,{skip:!data?.data?._id});



  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={'Rs./-'+dahboardInfo?.data?.totalIncomes?.[0]?.totalAmount}
        />
        {/* <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        /> */}
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={dahboardInfo?.data?.totalSales}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"Rs./-"+data?.data?.rewardPoints}
        />
        {/* <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        /> */}
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Products"}
          subtitle={dahboardInfo?.data?.totalProducts}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent  totalMonthSales={dahboardInfo?.data?.totalMonthSales}/>
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

     
    </div>
  );
};

export default SellerDashboard;
