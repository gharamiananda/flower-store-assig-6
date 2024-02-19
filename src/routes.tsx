import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
// import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";



// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import CreateSeller from "views/manager/createSeller";
import CreateProduct from "views/manager/product/components/createProduct";
import ProductTable from "views/manager/product/ProductTable";
import CreateCoupon from "../src/views/manager/coupon/components/CreateCoupon";
import CouponTable from "views/manager/coupon/CouponTable";
import CreateSale from "views/seller/sales/components/CreateSale";
import SellerDashboard from "views/seller";
import SalesList from "views/seller/sales/components/SalesList";
// import CreateCoupon from "views/manager/coupon/components/CreateCoupon";

const customerRoutes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
 
];


const publicRoutes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
 
];


const managerRroutes = [
 
  {
    name: "Manager Dashboard",
    layout: "/manager",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Create Seller",
    layout: "/manager",
    path: "create-seller",
    icon: <MdPerson className="h-6 w-6" />,

    component: <CreateSeller />,
  },
  {
    name: "Create Product",
    layout: "/manager",
    path: "create-product",
    icon: <MdPerson className="h-6 w-6" />,

    component: <CreateProduct />,
  },
  {
    name: "Edit Product",
    layout: "/manager",
    path: "edit-product/:slug",
    icon: <MdPerson className="h-6 w-6" />,
   

    component: <CreateProduct />,
  },
  {
    name: "Product list",
    layout: "/manager",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "product-list",
    component: <ProductTable />,
  },

  {
    name: "Coupon list",
    layout: "/manager",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "coupon-list",
    component: <CouponTable />,
  },

  {
    name: "Create Coupon",
    layout: "/manager",
    path: "create-coupon",
    icon: <MdPerson className="h-6 w-6" />,

    component: <CreateCoupon />,
  },
];




const sellerRroutes = [
 
  {
    name: "Seller Dashboard",
    layout: "/seller",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <SellerDashboard />,
  },
  // {
  //   name: "Create Sales",
  //   layout: "/seller",
  //   path: "create-sales",
  //   icon: <MdPerson className="h-6 w-6" />,

  //   component: <CreateSale />,
  // },

  {
    name: "Product list",
    layout: "/seller",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "product-list",
    component: <ProductTable />,
  },
  {
    name: "Sales History",
    layout: "/seller",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "sales-history",
    component: <SalesList />,
  },
 
];






export default {
  sellerRroutes,
  managerRroutes,
  customerRoutes,
  publicRoutes
};
