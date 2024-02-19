import InputField from "components/fields/InputField";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { useRegisterMutation } from "redux/features/auth/authApi";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRegisterMutation } from "../../../../redux/features/auth/authApi";
import { Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useAddProductMutation, useGetSingleProductQuery, useUpdateProductMutation } from "../../../../redux/features/product/productApi";
import { TError } from "types/global.types";
import moment from "moment";
import DragDropUploader from "components/fileuploader";
// import { TextField, Checkbox } from "@material-ui/core";

interface IFormInputs {
  

_id?: string;
slug?: string;
image?: string;
  name : string
  price  : number
  quantity : number
  color : string
  type :  string 
  size : string
  fragrance : string
  bloomDate: string;
  description: string;
  images?:string[];
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

export default function CreateProduct() {



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

const { search } = useLocation();
const queryParams = new URLSearchParams(search);
const duplicatePdSlug = queryParams.get('duplicate');


const [createProductFn,{data:createData,isLoading: createLoading,isSuccess:createProductSuccess,error:createProductErr}]=useAddProductMutation<TAddProduct  >();
const [updateProductFn,{data:updateData,isLoading: updateLoading,isSuccess:updateProductSuccess,error:updateProductErr}]=useUpdateProductMutation<TAddProduct>();


  const { handleSubmit, control,reset ,watch,getValues,formState,register,setValue} = useForm<IFormInputs>({
  mode:'all'
  });

  const [pdSlug,setPdSlug]=useState<null|string>(null);

  useEffect(()=>{
    if(duplicatePdSlug||productSlug){
      
      setPdSlug(duplicatePdSlug||productSlug)
    }
  },[productSlug,duplicatePdSlug])

  const {data:signleProductData}=useGetSingleProductQuery<TProductRes>(pdSlug, {skip:!pdSlug});


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

  if(duplicatePdSlug){
    setValue('name', `${signleProductData?.data?.name} duplicate`, {shouldDirty:true,shouldTouch:true,shouldValidate:true})
  }

  // if(signleProductData?.data?.images){
  //   setValue('image', signleProductData?.data?.images[0], {shouldDirty:true,shouldTouch:true,shouldValidate:true})
  // }

}

},[signleProductData]);


console.log('formState', watch())
  const onSubmit: SubmitHandler<IFormInputs> =async (data) =>{
    // addToast('Product is creating....','loading');



   
   
    
    
    try {

  
  
      
      if(productSlug){

        // await updateProductFn({...data,productId})


        toast.promise(new Promise(async(resolve, reject) => {
          
          const res : {error:{data:{message:string}}}|any=  await  updateProductFn({...data,price:Number(data.price), quantity:Number(data.quantity),productId: data?._id});
          
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
const formData= new FormData();

const price=Number(data.price);
const  quantity=Number(data.quantity);
const sendData={...data,price,quantity}

const {_id,image,...restData}=sendData

formData.append('data',JSON.stringify({...restData,images:[image]}));
// formData.append('file',image);


        // return  
        toast.promise(new Promise(async(resolve, reject) => {


          
          const res : {error:{data:{message:string}}}|any=  await  createProductFn(formData);
          
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
      // updateToast(message as string ,'success');
      navigate('/manager/product-list')

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



  const handleImage=(value:any)=>{
    setValue('image',value)
  }
   
  return (
    <>
    <div className="mt-8 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
    
    
 

      <div className="mt-[2vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0">
       
   

        <form onSubmit={handleSubmit(onSubmit)}>

<div className="flex justify-center mb-6">

     <div className="w-96 ">


<DragDropUploader handleImage={handleImage} />
     </div>
</div>
        <SimpleGrid columns={[2, null, 3]}  spacingX='40px'>
         
        {/* <Controller
        name="image"
        control={control}
        render={({ field:{onChange,value,...field} }) => {
         return  <div>
             <label   className="ml-1.5 font-medium ml-3 font-bold text-green-700 dark:text-green-500">Image </label>
         <input
          placeholder="Enter product name"
         name="name"
          type="file"
          value={(value  as any)?.fileName}
          className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none $"
          {...field}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            onChange(e.target?.files[0])
          }}
         
        />
        </div>
        }}
      /> */}
        

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
        name="price"
        control={control}
     

        rules={{ required: 'price is required' }}
        render={({ field,fieldState }) => {
         return <
        
        InputField
          variant="auth"
          extra="mb-3"
          label="price*"
          placeholder="Enter price"
          // valueAsNumber={true}
         name="price"
          type="text"
          {...fieldState}
          
          error={fieldState?.error?.message}

          // onChange={(e:React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value))}

         
        {  ...field} />}}
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
    name="color"
    control={control}
    rules={{ required:  'color is required'  }}
    render={({ field,fieldState }) => <
    
    InputField
    variant="auth"
    extra="mb-3"
    label="color*"
    placeholder="Min. 8 characters"
    name="color"
    {...fieldState}
    error={fieldState?.error?.message}


    {...field} />}
  />  <Controller
  name="type"
  control={control}
  rules={{ required:  'type is required'  }}
  render={({ field,fieldState }) => <
  
  InputField
  variant="auth"
  extra="mb-3"
  label="type*"
  placeholder="Min. 8 characters"
  name="type"
  {...fieldState}
  error={fieldState?.error?.message}


  {...field} />}
/>  <Controller
name="size"
control={control}
rules={{ required:  'size is required'  }}
render={({ field,fieldState }) => <

InputField
variant="auth"
extra="mb-3"
label="size*"
placeholder="Min. 8 characters"
name="size"
{...fieldState}
error={fieldState?.error?.message}


{...field} />}
/>
    
<Controller
name="fragrance"
control={control}
rules={{ required:  'fragrance is required'  }}
render={({ field,fieldState }) => <

InputField
variant="auth"
extra="mb-3"
label="fragrance*"
placeholder="Min. 8 characters"
name="fragrance"
{...fieldState}
error={fieldState?.error?.message}


{...field} />}
/>  <Controller
name="bloomDate"
control={control}
rules={{ required:  'bloomDate is required'  }}
render={({ field,fieldState }) => <

InputField
variant="auth"
extra="mb-3"
label="bloomDate*"
placeholder="Min. 8 characters"
name="bloomDate"
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
{productSlug ? "Update" :'Create'} Product
</Button >

        </form>
      
      </div>
      </div>
     
    </>
  );
}
