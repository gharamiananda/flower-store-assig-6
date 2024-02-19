import React, { useEffect, useState } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";

import Checkbox from "components/checkbox";
import { useDeleteProductMutation, useGetFilterOptionsQuery, useGetProductsQuery } from "../../../../redux/features/product/productApi";
import useDebounce from "hooks/useDebounce";
import { TMeta } from "types/global.types";
import {  FiEdit, FiSearch } from "react-icons/fi";
import PopModal from "components/popover/PopModal";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import CustomModal from "components/modal";
import CreateSale from "views/seller/sales/components/CreateSale";
import FilterOptions from "./FilterOptions";
import ConfirmModal from "components/modal/ConfirmModal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from "@chakra-ui/react";


// type RowObj = {
//   name: string;
//   status: string;
//   date: string;
//   progress: number;
// };


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
  price: number
  quantity: number
  isDeleted: boolean
  color: string
  type: string
  size: string
  fragrance: string
  bloomDate: string
  createdAt: string
  updatedAt: string;
  discountPercentage:number;
   expiredAt:string
}
type TProdctList={
  data:{
   data:{ Products:{meta:TMeta,result:ISingleProduct[]}}
  };
  isLoading:boolean;
   isFetching:boolean
}




export interface IFilterOptions {
  types: string[]
  sizes: string[]
  colors: string[]
  fragrances: string[]
}



export interface IFilterData {
  Products: IFilterOptions[]
}


// const columns = columnsDataCheck;
export default function ProductList() {


  const {data}=useGetFilterOptionsQuery<{data:{data:IFilterData}}>(undefined);


  const typesOptions= data?.data?.Products?.[0]?.types;
  const colorsOptions= data?.data?.Products?.[0]?.colors;
  const sizesOptions= data?.data?.Products?.[0]?.sizes;
  const fragrancesOptions= data?.data?.Products?.[0]?.fragrances;

  const [productDeleteFn,{data:productDelete,isLoading:deleteLoading}]=useDeleteProductMutation();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  

  const handleDeleteProducts = async(id?:string)=>{
    // const id = toast.loading('Please wait...');
 try {
 
   await productDeleteFn(id ? [id] :selectedRowKeys);
  //  toast.success('Product deleted successfully',{id:id});
  //  setOpen(false);
   setSelectedRowKeys([]);
   closeModal()
   
 } catch (error) {
   
 }
   };
 

    const[page, setPage]=useState(1);
    const[limit, setlimit]=useState(5);
  
    const [queryString,setQueryString]=useState<{name:string, value:string|number|boolean}[]>([]);
    const [isStockAvailabe,setisStockAvailabe]=useState<string>("In Stock");
  
  
    
    
    const [searchText, setSearchText]=useState<string>('');
    const debounceText=useDebounce(searchText, 600)
    
    const {data:productData,isLoading:productLoading, isFetching}=useGetProductsQuery<TProdctList>(queryString);






    const [toDate, settoDates]=useState<null|string>(null)
    const [fromDate, setFromDates]=useState<null|string>(null)


    const [productTypes,setproductTypes]=useState<string[]>([]);
    const [productSizes,setproductSizes]=useState<string[]>([]);
    const [productFragnences,setproductFragnences]=useState<string[]>([]);
    const [productPrices,setproductPrices]=useState<undefined|{minPrice:number,maxPrice:number}>(undefined);
  console.log(productSizes,'productSizes')
  
  
    useEffect(()=>{

      setQueryString([])
      const queryObj:{name:string, value:string|number|boolean}[]=[{name:"productStock", value: isStockAvailabe}]
      if(debounceText){
        queryObj.push({name:'searchTerm' , value:debounceText}) 
      }
     
      if(productTypes.length){
        queryObj.push({name:'types' , value:JSON.stringify(productTypes)}) 
      }
      if(productSizes.length){
        queryObj.push({name:'sizes' , value:JSON.stringify(productSizes)}) 

      } if(productFragnences.length){
        queryObj.push({name:'fragrances' , value:JSON.stringify(productFragnences)}) 

      }
  
      if(productPrices?.maxPrice){
        queryObj.push({name:'maxPrice' , value:productPrices?.maxPrice}) 

      } if(productPrices?.minPrice){
        queryObj.push({name:'minPrice' , value:productPrices?.minPrice}) 

      
      }
  
      if(page){
        queryObj.push({name:'page' , value:page})
      } if(limit){
        queryObj.push({name:'limit' , value:limit})

      }
  
      if(fromDate){
        queryObj.push({name:'bloomFromDate' , value:fromDate})

      }
      if(toDate){
        queryObj.push({name:'bloomFromDate' , value:toDate})
      }
  
     
  
    setQueryString((queryObj))
  
  
      
    },[debounceText,productFragnences,productSizes,productTypes,productPrices,page,limit,isStockAvailabe,fromDate, toDate])



  let defaultData = productData?.data?.Products?.result ||[];
const navigate=useNavigate()

const user =useAppSelector(selectCurrentUser);


const [isOpen, setIsOpen] = useState<boolean>(false);
const [isDeleteModal, setisDeleteModal] = useState<boolean>(false);


const closeModal = () => {
  setIsOpen(false);
  setisDeleteModal(false);
};


const [selectedProduct,setSelectedProduct]=useState<null|ISingleProduct>(null)




  
  return (
    <>
  



   

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
  <div className="">
  <FilterOptions 
  productPrices={productPrices}
  productSizes={productSizes}
  productTypes={productTypes}
  setproductTypes={setproductTypes}
  setproductSizes={setproductSizes}
  productFragnences={productFragnences}
  setproductFragnences={setproductFragnences}
  setproductPrices={setproductPrices}
  settoDates={settoDates}
  setFromDates={setFromDates}
  
  
  />
  </div>
  <div className="col-span-3 ">
  <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Product Table
        </div>

        <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px] me-12">
        
          <input
            type="text"
            onChange={e=> setSearchText(e.target.value)}
            placeholder="Search product..."
            className="ps-5 block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />


<button className="bg-gray-500 rounded-full py-2 px-3 flex items-center">

<p className="pl-1 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
       <p>
           Search
        </p>
</button>
        </div>
      
      
       
      </div>
     
   { user?.role !=='seller'  && selectedRowKeys?.length> 0 &&  <button
                   onClick={() => setisDeleteModal(true)}
                   className={`flex items-center text-sm hover:cursor-pointer ${
                     false
                       ? "bg-none text-white hover:bg-none active:bg-none"
                       : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                   } linear justify-center rounded-lg font-bold transition duration-200 text-sm`}
                 >
                 Delete Selected
                 </button>}
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
                Product Image
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Size
                </th>
                <th scope="col" className="px-6 py-3">
                    Fragnance
                </th>
                <th scope="col" className="px-6 py-3">
                bloomDate
                </th>
                <th scope="col" className="px-6 py-3">
                   Action
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
      disabled={user?.role =='seller' }
        colorScheme="brandScheme"
        me="10px"
        onChange={() => {
          // const seletedId=info.getValue()
          setSelectedRowKeys(prev=>prev.includes(tData?.slug) ? prev.filter(it=>it!==tData?.slug):[...prev,tData?.slug])
        }}
      />
      <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
        {/* {info.getValue()[0]} */}
      </p>
    </div>
            
            
            
            
              </td>
              <td className="whitespace-nowrap px-6 py-4">

                <img src={tData?.images[0]} alt=""  />
              </td>
              <td className="whitespace-nowrap px-6 py-4">{tData?.name}</td>

              <td className="whitespace-nowrap px-6 py-4">{tData?.price}</td>
              <td className="whitespace-nowrap px-6 py-4">{tData?.quantity}</td>
              <td className="whitespace-nowrap px-6 py-4">{tData?.color}</td>
              <td className="whitespace-nowrap px-6 py-4">{tData?.size}</td>
              <td className="whitespace-nowrap px-6 py-4">{tData?.fragrance}</td>
              <td className="whitespace-nowrap px-6 py-4">{ moment(tData?.bloomDate).format('DD-MM-YYYY')}</td>
              <td className="whitespace-nowrap px-6 py-4">
                
              <div className="text-sm font-bold text-navy-700 dark:text-white flex gap-3">
                {
                  user?.role =='seller' ? <>
                    <button
                   onClick={() => {
                    setSelectedProduct(tData)
                    setIsOpen(true)
                   }}
                   className={`flex items-center text-xl hover:cursor-pointer ${
                     false
                       ? "bg-none text-white hover:bg-none active:bg-none"
                       : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                   } linear justify-center rounded-lg font-bold transition duration-200`}
                 >
                   <FiEdit className="h-5 w-5"  />
                 </button>
         
                  </> :<>
                  <button
                   onClick={() => navigate(`/manager/edit-product/${tData?.slug}`)}
                   className={`flex items-center text-xl hover:cursor-pointer ${
                     false
                       ? "bg-none text-white hover:bg-none active:bg-none"
                       : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                   } linear justify-center rounded-lg font-bold transition duration-200`}
                 >
                   <FiEdit className="h-5 w-5"  />
                 </button>
         
         
         <PopModal  key={tData?._id} onSubmit={()=>handleDeleteProducts(tData?.slug)}  />

         <button
                   onClick={() => navigate(`/manager/create-product?duplicate=${tData?.slug}`)}
                   className={`flex items-center text-sm hover:cursor-pointer ${
                     false
                       ? "bg-none text-white hover:bg-none active:bg-none"
                       : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                   } linear justify-center rounded-lg font-bold transition duration-200 text-sm`}
                 >
                 Duplicate
                 </button>
                  </>
                }
         

       
         
         
                 </div>
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
            <span className="font-medium">{productData?.data?.Products?.meta?.total}</span> results
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
         
         {[...Array(productData?.data?.Products?.meta?.totalPage)]?.map((_,index)=>(

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
                                  if(productData?.data?.Products?.meta?.totalPage !==page){

                                    setPage(prev=> (prev+1))}}
                                  }

                  className={` ${productData?.data?.Products?.meta?.totalPage !==page && 'cursor-pointer'}   relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
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
  </div>
</div>

      


    <div className="flex justify-center items-center ">
     
      <CustomModal isOpen={isOpen} onClose={closeModal}>
      <CreateSale closeModal={closeModal} productInfo={selectedProduct} />
      </CustomModal>
    </div>


    <ConfirmModal  isOpen={isDeleteModal} onClose={closeModal}  >
    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to delete these products?
      </h3>
      <div className="flex justify-center gap-4">
        <Button isLoading={deleteLoading}   loadingText='deleting...' className="bg-red-500 text-white px-3 py-2 rounded-lg" onClick={()=>handleDeleteProducts()}>
          {"Yes, I'm sure"}
        </Button>
        <Button color="gray" onClick={closeModal}>
          No, cancel
        </Button>
      </div>
    </ConfirmModal>
    
    </>
  );
}
