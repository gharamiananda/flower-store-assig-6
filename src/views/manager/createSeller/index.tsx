import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { useRegisterMutation } from "redux/features/auth/authApi";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { Button, Stack, Toast, useToast } from "@chakra-ui/react";
// import { TextField, Checkbox } from "@material-ui/core";

interface IFormInputs {
  password: string
  email: string;
  name: string
}

export default function CreateSeller() {

  interface IRegister {
   
    data:any;
    isError:boolean;
    error:{data:{errorMessage:string}};
    isSuccess:boolean;
    isLoading:boolean
  }

  const[registerFn, {data,isError,error,isSuccess,isLoading}]=useRegisterMutation<IRegister>();

  const { handleSubmit, control,reset ,formState,register} = useForm<IFormInputs>({
  mode:'all'
  });
console.log('formState', formState.errors)
  const onSubmit: SubmitHandler<IFormInputs> =async (data) =>{
     console.log(data,'submit value');
     try {

      // const id= toast.loading('Please Wait.....');
      // setToastId(id)
  
  
      
     const res=await registerFn({...data,role:'seller'});
  
  
    } catch (error:any) {
  
        console.log('error :>> ', error);
      }
    
    }

const dispatch=useAppDispatch()

const navigate=useNavigate()

  useEffect(()=>{
    if(isSuccess){
      addToast(data?.message as string ,'success');


    } else if(isError){

      addToast(error?.data?.errorMessage as string ,'error');

    

    }

  },[data,isError,error,isSuccess,isLoading])

   
  const toast = useToast()
  const toastIdRef :any= useRef()

  function update() {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, { description: 'new text' })
    }
  } 

  function addToast(message:string,type?: "error" | "info" | "warning" | "success" | "loading") {
    
    toastIdRef.current = toast({ description: message,position:"top-right",status:type||'success'})
  
}


  return (
    <>
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
       
      


        <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field,fieldState }) => {
         return <
        
        InputField
          variant="auth"
          extra="mb-3"
          label="Name*"
          placeholder="Enter your name"
         name="name"
          type="text"
          {...fieldState}
          error={fieldState?.error?.message}
         
        {...field} />}}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Email is required' }}
        render={({ field,fieldState }) => {
         return <
        
        InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
         name="email"
          type="text"
          {...fieldState}
          error={fieldState?.error?.message}
         
        {...field} />}}
      />
    
      <Controller
      name="password"
      control={control}
      rules={{ required:  'Password is required'  }}
      render={({ field,fieldState }) => <
      
      InputField
      variant="auth"
      extra="mb-3"
      label="Password*"
      placeholder="Min. 8 characters"
      name="password"
      type="password"
      {...fieldState}
      error={fieldState?.error?.message}


      {...field} />}
    />
    
     
      
        <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Create Seller
        </button>
        </form>
      
      </div>
      </div>

     
    </>
  );
}
