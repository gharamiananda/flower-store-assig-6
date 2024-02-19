import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError={


    data:{
        message: string;
        stack: string;
        success: boolean;
    },
    status:number
}

export type TMeta={
page:number;
limit:number; total:number;
totalPage:number
}

export type TResponse<T>={
    data:T;
    error:TError;
    meta?:TMeta;
    success: boolean;


}

export type TQueryParam = {
    name: string;
    value: boolean | React.Key;
  };



  export interface IUserInfo {
    _id: string
    name: string
    email: string
    role: string
    needPasswordChange: boolean
    isDeleted: boolean
    rewardPoints: number
    createdAt: string
    updatedAt: string
  }
  
  
export type TResponseRedux<T>=TResponse <T>& BaseQueryApi