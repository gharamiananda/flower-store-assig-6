import { Routes, Route, Navigate } from "react-router-dom";

// import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useAppSelector } from "./redux/hooks";
import { selectCurrentUser } from "./redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useGetMeQuery } from "./redux/features/user/userApi";
const App = () => {


  const user =useAppSelector(selectCurrentUser);
const [isMount,setIsMount]=useState(false);

useEffect(()=>{setIsMount(true)},[]);



//   if(!user?.role  && isMount){
// return <Navigate to='/auth/sign-in' replace />
//   }

// const {data,isSuccess,isLoading}=useGetMeQuery(undefined);

// if(isLoading){
//  return <p>Loading</p>
// }

// if(!isLoading && !data){
  
// }



if(!isMount){
  return <p>Loading.......</p>
}

const userRole=user?.role
let navigateUrl='/auth/sign-in'

if(userRole==='manager'){
  navigateUrl='/manager/dashboard'
}

else if(userRole==='seller'){
  navigateUrl='/seller/dashboard'

}



  return (
    <>
   {isMount ?  <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      {/* <Route path="admin/*" element={<AdminLayout />} /> */}
      <Route path="manager/*" element={<AdminLayout />} />
      <Route path="seller/*" element={<AdminLayout />} />


      <Route path="/" element={<Navigate to={navigateUrl} replace />} />
    </Routes> : <p>Loading...</p>}
    </>
  );
};

export default App;
