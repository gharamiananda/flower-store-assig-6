import React, { useEffect, useState } from "react";
import Card from "components/card";
import Checkbox from "components/checkbox";
import { useDeleteProductMutation } from "../../../../redux/features/product/productApi";
import { TMeta } from "types/global.types";
import { FiEdit } from "react-icons/fi";
import PopModal from "components/popover/PopModal";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import TabsRender, { ReportType } from "components/tabs";
import { useGetSalesQuery } from "../../../../redux/features/sales/salesApi";



export interface ISales {
  _id: string
  nameOfBuyer: string
  soldQuantity: number
  soldDate: string
  product: ISingleProduct
  salesMan: string
  totalPrice: number
  couponPrice: number
  couponName: string
  rewardsPrice: number
  productPrice: number
  createdAt: string
  updatedAt: string
}


export interface ICreatedBy {
  _id: string
  name: string
  email: string
  role: string
  needPasswordChange: boolean
  isDeleted: boolean
  status: string
  createdAt: string
  updatedAt: string
}


export interface ISingleProduct {
  _id: string
  name: string
  slug: string
  description: string
  images: any[]
  createdBy: ICreatedBy
  discountPercentage: number
  quantity: number
  isDeleted: boolean;
  price:number;
  color: string
  type: string
  size: string
  fragrance: string
  expiredAt: string
  createdAt: string
  updatedAt: string
}
type TProdctList={
  data:{
   data:{ Sales:{meta:TMeta,result:ISales[]}}
  };
  isLoading:boolean;
   isFetching:boolean
}


// const columns = columnsDataCheck;
export default function SalesList() {

  const [productDeleteFn,{data:productDelete,isLoading}]=useDeleteProductMutation();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  

  const handleSubmit = async(id?:string)=>{
    // const id = toast.loading('Please wait...');
 try {
 
   await productDeleteFn(id ? [id] :selectedRowKeys);
  //  toast.success('Product deleted successfully',{id:id});
  //  setOpen(false);
   setSelectedRowKeys([])
   
 } catch (error) {
   
 }
   };
 

    const[page, setPage]=useState(1);
    const[limit, setlimit]=useState(5);
    const [queryString,setQueryString]=useState<{name:string, value:string|number|boolean}[]>([]);
  
  
    const {data:productData,isLoading:productLoading, isFetching}=useGetSalesQuery<TProdctList>(queryString);
  
  
    console.log('productData', productData)


  let defaultData = productData?.data?.Sales?.result ||[];
const navigate=useNavigate();

  const [openTab, setOpenTab] = useState<ReportType>('Weekly');



useEffect(()=>{

  setQueryString([])
  const queryObj:{name:string, value:string|number|boolean}[]=[]
  if(openTab){
    queryObj.push({name:'sales' , value:openTab}) 
  }
 
  if(page){
    queryObj.push({name:'page' , value:page})
  }
   if(limit){
    queryObj.push({name:'limit' , value:limit})

  }

setQueryString((queryObj))


  
},[page, limit,openTab])


  
  return (
    <>
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Sales Table
        </div>
     
<div className="flex  justify-end">

<TabsRender color="white"   setOpenTab={setOpenTab} openTab={openTab} />
</div>
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
      
        


        <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Sl No.
                </th>
                <th scope="col" className="px-6 py-3">
                Product name
                </th>
                <th scope="col" className="px-6 py-3">
                Buyer name
                </th>
                <th scope="col" className="px-6 py-3">
               Total Price
                </th>
            
                <th scope="col" className="px-6 py-3">
                   Sold Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                Sold Date
                </th>
                <th scope="col" className="px-6 py-3">
                Coupon Name
                </th>
              
            </tr>
        </thead>
        <tbody>


          {  isFetching ?  
<div role="status" className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
    <div className="flex items-center justify-between">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <span className="sr-only">Loading...</span>
</div>
:
            defaultData?.map(tData=>{

              return   <tr key={tData?._id} className="">
              <td className="whitespace-nowrap px-6 py-4 font-medium ">
              <div className="flex items-center">
      <Checkbox
        // defaultChecked={info.getValue()[1]}
        // checked={selectedRowKeys.includes(info.getValue())}
        colorScheme="brandScheme"
        me="10px"
        onChange={() => {
          // const seletedId=info.getValue()
          setSelectedRowKeys(prev=>prev.includes(tData?._id) ? prev.filter(it=>it!==tData?._id):[...prev,tData?._id])
        }}
      />
      <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
        {/* {info.getValue()[0]} */}
      </p>
    </div>
            
            
            
            
              </td>
              <td className="whitespace-nowrap px-6 py-4">{tData?.nameOfBuyer}</td>
              <td className="whitespace-nowrap px-6 py-4">{tData?.product?.name}</td>

              <td className="whitespace-nowrap px-6 py-4">{tData?.totalPrice}</td>
              <td className="whitespace-nowrap px-6 py-4">{tData?.soldQuantity}</td>
              <td className="whitespace-nowrap px-6 py-4">{ moment(tData?.soldDate).format('DD-MM-YYYY')}</td>
              <td className="whitespace-nowrap px-6 py-4">
              
             {tData?.couponName ? tData?.couponName  : 'N/A'}
                </td>

           
            </tr>
            })
          }
          
               

               
              </tbody>
            </table>
         

  <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page}</span> to <span className="font-medium">{limit}</span> of{' '}
            <span className="font-medium">{productData?.data?.Sales?.meta?.total}</span> results
          </p>
        </div>
        <div>
        <nav aria-label="Page navigation example">
      <ul className="list-style-none flex">
          <li>
              <a

onClick={()=>{
  if(1 !==page){

    setPage(prev=> (prev-1))}}
  }


                  className={` ${1 !==page && 'cursor-pointer'}  relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}>Previous</a>
          </li>
         
         {[...Array(productData?.data?.Sales?.meta?.totalPage)]?.map((_,index)=>(

           <li  key={index+1}>
              <a
             
                  className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white ${page==index+1 && 'bg-brandLinear' }`}
                  href="#!"
                  onClick={()=>setPage(index+1)}
                  >{index+1}</a>
          </li>
                  ))
          }
          <li >
              <a
                                onClick={()=>{
                                  if(productData?.data?.Sales?.meta?.totalPage !==page){

                                    setPage(prev=> (prev+1))}}
                                  }

                  className={` ${productData?.data?.Sales?.meta?.totalPage !==page && 'cursor-pointer'}   relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                  href="#!">Next</a>
          </li>
      </ul>
  </nav>
         
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </Card>



    {/* <Button onClick={onOpen}>Trigger modal</Button> */}



    
    </>
  );
}
