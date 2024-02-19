import React from "react";
import Dropdown from "components/dropdown";
import { AiOutlineUser } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineShop } from "react-icons/ai";
import { TiLightbulb } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";

function PopModal(props: { transparent?: boolean ,onSubmit:(id:string)=>void}) {
  const { transparent,onSubmit } = props;
  const [open, setOpen] = React.useState(false);

  const handleConfirmClick = (id: string) => {
    onSubmit(id); // Call onSubmit with the id
    setOpen(false); // Close the dropdown after submission
  };


  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <RiDeleteBin5Line className="h-5 w-5" />
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none flex items-center gap-3">
          <p className="hover:text-black flex cursor-pointer items-center gap-2 text-red-600 hover:font-medium" onClick={() => handleConfirmClick("someId")}>
            <span>
              <AiOutlineUser />
            </span>
Confirm          </p>
          <p className="hover:text-black flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium" onClick={()=>{
            
            setOpen(false)}}>
            <span>
              <AiOutlineShop     />
            </span>
          Cancel
          </p>
        </div>
      }
    />
  );
}

export default PopModal;
