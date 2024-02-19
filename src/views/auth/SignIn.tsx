import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { useLoginMutation } from "redux/features/auth/authApi";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser, setUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Button, useToast } from "@chakra-ui/react";
// import { TextField, Checkbox } from "@material-ui/core";

interface IFormInputs {
  password: string
  email: boolean
}

export default function SignIn() {

  const toast = useToast()
  const user =useAppSelector(selectCurrentUser);


 


  const[loginFn, {data:loginData,isError,error,isSuccess,isLoading}]=useLoginMutation();

  const { handleSubmit, control,reset ,formState,register} = useForm<IFormInputs>({
  mode:'all'
  });
console.log('formState', formState.errors)
  const onSubmit: SubmitHandler<IFormInputs> =async (data) =>{
     console.log(data,'submit value');
     try {

      toast.promise(new Promise(async(resolve, reject) => {
          
        const res : {error:{data:{message:string}}}|any=  await  loginFn(data);
        
        console.log('res', res)
          if(res?.error?.data?.errorMessage){
            reject(res?.error?.data?.errorMessage)
          }else{
            resolve(true);
          }
        }), {
       
        success: { title: 'User is Loggedin  successfully', description: 'Looks great' , position:"top-right",},
        error: (err)=>({ title: err as any|| 'User  Login failed!', description: 'Something wrong', position:"top-right", }),
        loading: { title: 'User is  Logging....', description: 'Please wait...', position:"top-right", },
      })
  
  
  
  
    } catch (error:any) {
  
        console.log('error :>> ', error);
      }
    
    }

const dispatch=useAppDispatch()

const navigate=useNavigate()

  useEffect(()=>{
    if(isSuccess && loginData?.data?.token){
dispatch(setUser({user:loginData?.data?.user,token:loginData?.data?.token}));
// toast.success('User login successful',{id:toastId});
const userRole=(loginData?.data?.user?.role as string)
let navigateUrl='/seller/dashboard'

if(userRole==='manager'){
  navigateUrl='/manager/dashboard'
}

else if(userRole==='seller'){
  navigateUrl='/seller/dashboard'

}



navigate(navigateUrl)
    } else if(isError){

      // if ('data' in error) {
      //   const errorData = error?.data?.message || 'Something went wrong!';
      //   // toast.error(errorData,{id:toastId});
      // } 

    }

  },[loginData,isError,error,isSuccess,isLoading]);
  

   console.log(error,'loginData')

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>
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
    
     
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <Button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"  loadingText='Login...' isLoading={isLoading}>
          Sign In
        </Button>
        </form>
       
      </div>
    </div>
  );
}
