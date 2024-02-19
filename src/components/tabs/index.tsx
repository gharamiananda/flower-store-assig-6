import React, { useState } from "react";

export  type ReportType='Weekly'| 'Daily'| 'Monthly'|'Yearly'

interface TabsProps {
  color: string;
  setOpenTab: React.Dispatch<React.SetStateAction<ReportType>>;
  openTab:ReportType
}



const TabsRender: React.FC<TabsProps> = ({ color,setOpenTab ,openTab}) => {
  // const [openTab, setOpenTab] = useState<ReportType>('Weekly');

  const handleTabClick = (tabNumber: ReportType) => {
    setOpenTab(tabNumber);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-34">
        <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <button
              className={`text-xs cursor-pointer font-bold uppercase px-6 py-2 shadow-lg rounded block leading-normal ${
                openTab !== 'Daily' ? `text-white bg-${color}-600` : `text-${color}-600 bg-blue-400`
              }`}
              onClick={() => handleTabClick('Daily')}
              role="tab"
              aria-selected={openTab !== 'Daily'}
            >
              Daily
            </button>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <button
              className={`text-xs cursor-pointer font-bold uppercase px-6 py-2 shadow-lg rounded block leading-normal ${
                openTab !== 'Weekly' ? `text-white bg-${color}-600` : `text-${color}-600 bg-blue-400`
              }`}
              onClick={() => handleTabClick('Weekly')}
              role="tab"
              aria-selected={openTab !== 'Weekly'}
            >
              Weekly
            </button>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <button
              className={`text-xs cursor-pointer font-bold uppercase px-6 py-2 shadow-lg rounded block leading-normal ${
                openTab !== 'Monthly' ? `text-white bg-${color}-600` : `text-${color}-600 bg-blue-400`
              }`}
              onClick={() => handleTabClick('Monthly')}
              role="tab"
              aria-selected={openTab !== 'Monthly'}
            >
              Monthly
            </button>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <button
              className={`text-xs cursor-pointer font-bold uppercase px-6 py-2 shadow-lg rounded block leading-normal ${
                openTab !== 'Yearly' ? `text-white bg-${color}-600` : `text-${color}-600 bg-blue-400`
              }`}
              onClick={() => handleTabClick('Yearly')}
              role="tab"
              aria-selected={openTab !== 'Yearly'}
            >
              Yearly
            </button>
          </li>
        </ul>
      
      </div>
    </div>
  );
};

// const TabsRender: React.FC = () => {
//   return <Tabs color="pink" />;
// };

export default TabsRender;
