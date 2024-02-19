import InputField from "components/fields/InputField";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { useRegisterMutation } from "redux/features/auth/authApi";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useRegisterMutation } from "../../../../redux/features/auth/authApi";
import { Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useAddProductMutation, useGetSingleProductQuery, useUpdateProductMutation } from "../../../../redux/features/product/productApi";
import { TError } from "types/global.types";
import PromiseBasedToast from "components/toast";
import moment from "moment";
import { useAddCouponMutation, useUpdateCouponMutation } from "../../../../redux/features/coupon/couponApi";
// import { TextField, Checkbox } from "@material-ui/core";

interface IFormInputs {
  

_id?: string;
slug?: string;
  name : string;
  quantity : number;
  description: string
  Image: string;
  discountPercentage:number;
  expiredAt:string
}


type TAddProduct={
    data:any;
    isLoading:boolean;
    isSuccess:boolean;
    error:TError


}


type TProductRes={
  data:{
   data:IFormInputs
  }
}

export default function CreateCoupon() {



  const toast = useToast()
  const toastIdRef :any= useRef()

  function updateToast(message:string,type?: "error" | "info" | "warning" | "success" | "loading") {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current,{ description: message,position:"top-right",status:type||'success'})
    }
  } 

  function addToast(message:string,type?: "error" | "info" | "warning" | "success" | "loading") {
    
    toastIdRef.current = toast({ description: message,position:"top-right",status:type||'success'})
  
}




const {slug:productSlug}=useParams();

const [createCouponFn,{data:createData,isLoading: createLoading,isSuccess:createProductSuccess,error:createProductErr}]=useAddCouponMutation<TAddProduct  >();
const [updateCouponFn,{data:updateData,isLoading: updateLoading,isSuccess:updateProductSuccess,error:updateProductErr}]=useUpdateCouponMutation<TAddProduct>();


  const { handleSubmit, control,reset ,watch,getValues,formState,register,setValue} = useForm<IFormInputs>({
  mode:'all'
  });

  const {data:signleProductData}=useGetSingleProductQuery<TProductRes>(productSlug, {skip:!productSlug});


  useEffect(()=>{
    if(signleProductData?.data?._id){
        


        
Object.keys(signleProductData?.data)?.map((fld)=>{
  //  {name: [`${fld}`], value:  signleProductData?.data?.[fld]}


  if(fld==='bloomDate'){
    setValue(fld as keyof IFormInputs, `${moment(signleProductData?.data?.[fld  as keyof IFormInputs
    ]).format('YYYY-MM-DD')}`,{shouldDirty:true,shouldTouch:true,shouldValidate:true})
  }else{

    setValue(fld as keyof IFormInputs,signleProductData?.data?.[fld  as keyof IFormInputs
    ],{shouldDirty:true,shouldTouch:true,shouldValidate:true})
  }
  
  })

}

},[signleProductData]);


console.log('formState', formState.errors)
  const onSubmit: SubmitHandler<IFormInputs> =async (data) =>{
    // addToast('Product is creating....','loading');



   
   
    
    
    try {

  
  
      
      if(productSlug){

        // await updateCouponFn({...data,productId})


        toast.promise(new Promise(async(resolve, reject) => {
          
          const res : {error:{data:{message:string}}}|any=  await  updateCouponFn({...data,discountPercentage:Number(data.discountPercentage), quantity:Number(data.quantity),productId: data?._id});
          
          console.log('res', res)
            if(res?.error?.data?.message){
              reject('error')
            }else{
              resolve(true);
            }
          }), {
         
          success: { title: 'Product Updated successfully', description: 'Looks great' , position:"top-right",},
          error: { title: 'Product update failed!', description: 'Something wrong', position:"top-right", },
          loading: { title: 'Product updating....', description: 'Please wait...', position:"top-right", },
        })

      }else{
        toast.promise(new Promise(async(resolve, reject) => {
          
          const res : {error:{data:{message:string}}}|any=  await  createCouponFn({...data,discountPercentage:Number(data.discountPercentage), quantity:Number(data.quantity)});
          
          console.log('res', res)
            if(res?.error?.data?.message){
              reject('error')
            }else{
              resolve(true);
            }
          }), {
         
          success: { title: 'Product created successfully', description: 'Looks great' , position:"top-right",},
          error: { title: 'Product creation failed!', description: 'Something wrong', position:"top-right", },
          loading: { title: 'Product creating....', description: 'Please wait...', position:"top-right", },
        })
    
        
      
      }
  
  
    } catch (error:any) {
  
        console.log('error :>> ', error);
      }
    
    }

const dispatch=useAppDispatch()

const navigate=useNavigate()

 
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
  
  
  
  
  
  useEffect(() => {
    if (updateProductSuccess && !updateLoading) {
      const message = updateData?.message || 'Update Success';
     
      updateToast(message as string ,'success');

      navigate('/manager/product-list')
    } else if (updateProductErr) {
      
        if ('data' in updateProductErr) {
          const errorData = updateProductErr?.data?.message || 'Something went wrong!';
        //   toast.error(errorData,{id:toastId});
      updateToast(errorData as string ,'error');

        } 
    }
  }, [updateProductSuccess, updateLoading, updateProductErr, updateData]);

   
  return (
    <>
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
    
    
 

      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0">
       
   

        <form onSubmit={handleSubmit(onSubmit)}>

        <SimpleGrid columns={[2, null, 3]}  spacingX='40px'>

        <Controller
        name="name"
        control={control}
        rules={{ required: 'Product name is required' }}
        render={({ field,fieldState }) => {
         return <
        
        InputField
          variant="auth"
          extra="mb-3"
          label="Name*"
          placeholder="Enter product name"
         name="name"
          type="text"
          {...fieldState}
          error={fieldState?.error?.message}
         
        {...field} />}}
      />
    
    
      <Controller
      name="quantity"
      control={control}
      rules={{ required:  'quantity is required'  }}
      render={({ field,fieldState }) => <
      
      InputField
      variant="auth"
      extra="mb-3"
      label="quantity*"
      placeholder="Min. 8 characters"
      name="quantity"
      {...fieldState}
      error={fieldState?.error?.message}


      {...field} />}
    />
  
    
<Controller
name="discountPercentage"
control={control}
rules={{ required:  'discountPercentage is required'  }}
render={({ field,fieldState }) => <

InputField
variant="auth"
extra="mb-3"
label="discountPercentage*"
placeholder="Min. 8 characters"
name="discountPercentage"
{...fieldState}
error={fieldState?.error?.message}


{...field} />}
/>  <Controller
name="expiredAt"
control={control}
rules={{ required:  'expiredAt is required'  }}
render={({ field,fieldState }) => <

InputField
variant="auth"
extra="mb-3"
label="expiredAt*"
placeholder="Min. 8 characters"
name="expiredAt"
type="date"

{...fieldState}
error={fieldState?.error?.message}


{...field} />}



/> 





<Controller
name="description"
control={control}
rules={{ required:  'description is required'  }}
render={({ field,fieldState }) => <

InputField
variant="auth"
extra="mb-3"
label="description*"
placeholder="Min. 8 characters"
name="description"
{...fieldState}
error={fieldState?.error?.message}


{...field} />}
/>
     
      
       

</SimpleGrid>
<Button      loadingText='Product creating...'
type="submit" className="linear mt-2 w-96 rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" isLoading={createLoading}>
{productSlug ? "Update" :'Create'} Coupon
</Button >

        </form>
      
      </div>
      </div>
     
    </>
  );
}
