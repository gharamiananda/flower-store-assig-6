import InputField from "components/fields/InputField";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { useRegisterMutation } from "redux/features/auth/authApi";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useRegisterMutation } from "../../../../redux/features/auth/authApi";
import { Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useAddProductMutation, useGetSingleProductQuery, useUpdateProductMutation } from "../../../../redux/features/product/productApi";
import { IUserInfo, TError } from "types/global.types";
import PromiseBasedToast from "components/toast";
import moment from "moment";
import { useAddCouponMutation, useUpdateCouponMutation, useVerifyCouponMutation } from "../../../../redux/features/coupon/couponApi";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useAddSalesMutation } from "../../../../redux/features/sales/salesApi";
import { ISingleProduct } from "./SalesList";
import Checkbox from "components/checkbox";
import { useGetMeQuery } from "../../../../redux/features/user/userApi";
// import { TextField, Checkbox } from "@material-ui/core";








interface IFormInputs {
  

_id?: string;
slug?: string;
nameOfBuyer : string;
  soldQuantity : number;
  description: string
  Image: string;
  discountPercentage:number;
  soldDate:string;
  coupon:string;

}


type TAddProduct={
    data:any;
    isLoading:boolean;
    isSuccess:boolean;
    error:TError


}



export default function CreateSale({productInfo,closeModal}:{productInfo:ISingleProduct,closeModal:()=>void}) {



  const toast = useToast()
  const toastIdRef :any= useRef()
  const [isUseRewards,setisUseRewards]=useState(false);

  function updateToast(message:string,type?: "error" | "info" | "warning" | "success" | "loading") {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current,{ description: message,position:"top-right",status:type||'success'})
    }
  } 

  function addToast(message:string,type?: "error" | "info" | "warning" | "success" | "loading") {
    
    toastIdRef.current = toast({ description: message,position:"top-right",status:type||'success'})
  
}




const {slug:productSlug}=useParams();

const [createCouponFn,{data:createData,isLoading: createLoading,isSuccess:createProductSuccess,error:createProductErr}]=useAddSalesMutation<TAddProduct  >();
const [verifyCouponFn,{data:verifyData,isLoading: verifyLoading,isSuccess:verifyProductSuccess,error:verifyProductErr}]=useVerifyCouponMutation<TAddProduct>();






  const { handleSubmit, control,reset ,watch,getValues,formState,register,setValue,} = useForm<IFormInputs>({
  mode:'all',
  defaultValues:{
    soldQuantity:1
  }
  });
  const coupnData=watch('coupon')


  

const[isCouponVerified, setIsCouponVerified]=useState<Record<string,{discountPercentage:number,name:string,slug:string}>>({})


const couponnPrice=isCouponVerified[coupnData]?.discountPercentage ||0;

console.log('formState', formState.errors);




const {data}=useGetMeQuery<{data:{data:IUserInfo}}>(undefined);

const soldQuantity=watch('soldQuantity')||1;


const totalPriceWithQuantity=soldQuantity*productInfo?.price;
  const rewardsAmount =isUseRewards ?  data?.data?.rewardPoints : 0;
  const onSubmit: SubmitHandler<IFormInputs> =async (data) =>{
    // addToast('Product is creating....','loading');



   
   
    
    
    try {

      let rewardsPrice= rewardsAmount;
      let totalPrice=totalPriceWithQuantity -  (productInfo?.price/100)*couponnPrice   - rewardsAmount

      if((totalPriceWithQuantity -  (productInfo?.price/100)*couponnPrice   - rewardsAmount) <= 0){
        rewardsPrice=totalPriceWithQuantity -  (productInfo?.price/100)*couponnPrice;
        totalPrice=0

      }


    // rewardsPrice=   (totalPriceWithQuantity -  (productInfo?.price/100)*couponnPrice   - rewardsAmount) > 0 ? rewardsAmount : rewardsAmount - totalPriceWithQuantity -  (productInfo?.price/100)*couponnPrice;
  
      
     
        toast.promise(new Promise(async(resolve, reject) => {
          
          const res : {error:{data:{message:string}}}|any=  await  createCouponFn({...data,rewardsPrice  , product:productInfo?._id , productPrice: productInfo?.price ,couponPrice:isCouponVerified[coupnData]?.discountPercentage, couponName:isCouponVerified[coupnData]?.name  ,  salesMan:user?._id , totalPrice, soldQuantity:Number(data.soldQuantity)});
          
          console.log('res', res)
            if(res?.error?.data?.message){
              reject('error')
            }else{
              resolve(true);
              closeModal()
            }
          }), {
         
          success: { title: 'Sales created successfully', description: 'Looks great' , position:"top-right",},
          error: { title: 'Sales creation failed!', description: 'Something wrong', position:"top-right", },
          loading: { title: 'Sales creating....', description: 'Please wait...', position:"top-right", },
        })
    
        
      
      
  
  
    } catch (error:any) {
  
        console.log('error :>> ', error);
      }
    
    }

const dispatch=useAppDispatch()

const navigate=useNavigate();


const handleVerifyCoupon=()=>{
 

  toast.promise(new Promise(async(resolve, reject) => {
          
    const res : {error:{data:{message:string}}}|any=  await   verifyCouponFn(coupnData);
    
    console.log('res', res)
      if(!res?.data?.data){
        reject('error')
      }else{
        setIsCouponVerified(prev=>({...prev,[coupnData]:res?.data?.data}))
        resolve(true);
        // closeModal();
      }
    }), {
   
    success: { title: 'Coupon verified successfully', description: 'Looks great' , position:"top-right",},
    error: { title: 'Coupon verify failed!', description: 'Something wrong', position:"top-right", },
    loading: { title: 'Coupon varifing....', description: 'Please wait...', position:"top-right", },
  })
}

 
useEffect(() => {
    if (createProductSuccess && !createLoading) {
      const message = createData?.message || 'Success';
      updateToast(message as string ,'success');

    } else if (createProductErr) {
      
      if ('data' in createProductErr) {
        const errorData = createProductErr?.data?.message || 'Something went wrong!';
        updateToast(errorData as string ,'error');

      } 
    }
  }, [createProductSuccess, createLoading, createProductErr, createData]);
  
  
  
const user =useAppSelector(selectCurrentUser);
  
  const suucessClassNameInput='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  const errClassNameInput='bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500';


  const errLabel=`block mb-2 text-sm font-medium text-red-700 dark:text-red-500 text-left`;
  const successLabel=`block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-left`;


  return (
    <>
    <div className="text-center  ">
           {/* <CreateSale /> */}
         


<form onSubmit={handleSubmit(onSubmit)} >

<h2>{productInfo?.name} price {productInfo?.price}/ 1 unit</h2>

    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
        <label htmlFor="first_name" className={formState?.errors?.nameOfBuyer?.message ?  errLabel:successLabel}>Buyer name</label>

            <input type="text" id="first_name" name="nameOfBuyer" className={formState?.errors?.nameOfBuyer?.message ? errClassNameInput : suucessClassNameInput}  placeholder="John"  {...register("nameOfBuyer" , { required: 'Buyer name is required' })} />

         {formState?.errors?.nameOfBuyer?.message &&   <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {formState?.errors?.nameOfBuyer?.message}!</p>}

            


        </div>
        <div>
        <label htmlFor="first_name" className={formState?.errors?.soldQuantity ?  errLabel:successLabel}>Product Quantity</label>

            <input type="text" id="last_name" name="soldQuantity" className={formState?.errors?.soldQuantity ? errClassNameInput : suucessClassNameInput} placeholder="soldQuantity"  {...register("soldQuantity" , { required: 'Quantity  is required' ,      validate: (value) => value > 0,
  min: 1, max: { value: productInfo?.quantity ,message:`Product in stock ${productInfo?.quantity} available` } ,valueAsNumber:true})} />

         {formState?.errors?.soldQuantity &&   <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {formState?.errors?.soldQuantity?.message}!</p>}

        </div>
        <div>
        <label htmlFor="first_name" className={formState?.errors?.soldDate ?  errLabel:successLabel}>Sold Date</label>

            <input type="date" id="company" name="soldDate" className={formState?.errors?.soldDate ? errClassNameInput : suucessClassNameInput} placeholder="Flowbite"  {...register("soldDate",{required:'Sold Date is required '})} />
         {formState?.errors?.soldDate &&   <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {formState?.errors?.soldDate?.message}!</p>}

        </div>  
        <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-left">Seller Name</label>
            <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="seller" disabled value={user?.name}   />
        </div>
       
    </div>

    <div className="grid gap-6 mb-6 md:grid-cols-2">
       
        <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-left">Coupon Code</label>
            <input type="text" id="coupon" name="coupon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coupon code"  {...register("coupon")} />

        </div>  
        <div className={`flex justify-center items-end `}>
        <Button  
        onClick={handleVerifyCoupon}
            loadingText='Product creating...'
type="button" className={`linear  w-36 rounded-xl  ${isCouponVerified[coupnData]  ? 'bg-green-500' : ' bg-brand-700'}   py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
//  isLoading={createLoading}
 >
{isCouponVerified[coupnData] ? "Verified " : 'Verify ' }Coupon
</Button >
        </div>
       
    </div>



    

    <div className="flex items-center">
      <Checkbox
        // defaultChecked={info.getValue()[1]}
        checked={isUseRewards}
        colorScheme="brandScheme"
        me="10px"
        disabled={data?.data?.rewardPoints<=0}
        onChange={() => setisUseRewards(prev=>(!prev))}
      />
      <p className={`ml-3 text-sm font-bold ${data?.data?.rewardPoints<=0 ? ' text-red-700 ' : ' text-navy-700 '} dark:${ data?.data?.rewardPoints<=0 ? 'text-red-500' : 'text-white'}`}>
   {data?.data?.rewardPoints<=0 ? "You don't have any rewards points"  : `Use your reword point (${data?.data?.rewardPoints})`}
      </p>


    </div>
    <h2>You have to pay amount : {(totalPriceWithQuantity -  (productInfo?.price/100)*couponnPrice   - rewardsAmount) > 0 ? (   totalPriceWithQuantity -  (productInfo?.price/100)*couponnPrice - rewardsAmount ): 0 }</h2>
    
    
    {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> */}
    <Button      loadingText='Product creating...'
type="submit" className="linear mt-2 w-96 rounded-xl bg-brand-700 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
//  isLoading={createLoading}
 >
Create Sale
</Button >
</form>

          </div>
     
    </>
  );
}
