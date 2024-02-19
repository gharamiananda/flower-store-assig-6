import { TQueryParam } from 'types/global.types';
import { baseApi } from '../../api/baseApi';

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCoupon: builder.mutation({
      query: (userInfo) => ({
        url: 'coupons',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags:['sales','product','filter']
    }),
    verifyCoupon: builder.mutation({
      query: (slug) => ({
        url: 'coupons/'+slug,
        method: 'GET'
      }),
      // invalidatesTags:['sales','product','filter']
    }),
    getCoupons: builder.query({
      query: (query) => {

                 const params = new URLSearchParams();
  
          if (query) {
            query.forEach((item: TQueryParam) => {
              params.append(item.name, item.value as string);
            });
          }

      return { url: 'coupons',
      params:params,

        method: 'GET'}
      },
      providesTags:['product']
    }),
    getFilterOptions: builder.query({
      query: () => ({
        url: 'coupons/filter-options',

        method: 'GET'
      }),
      providesTags:['filter']
    }),
    
    getSingleCoupon: builder.query({
      query: (productId) => ({
        url: 'coupons/'+productId,
        method: 'GET'
      }),
    }),
    deleteCoupon: builder.mutation({
      query: (productsIds) => ({
        url: 'coupons/delete-products',
        method: 'DELETE',
        body:productsIds

      }),
      invalidatesTags:['sales','product']
    }),

    updateCoupon: builder.mutation({
      query: ({productId,...data}) => ({
        url: 'coupons/'+productId,
        method: 'PATCH',
        body:data

      }),
      invalidatesTags:['sales','product']

    }),
  }),
});

export const {

useAddCouponMutation,
useDeleteCouponMutation,
useGetCouponsQuery,
useGetSingleCouponQuery,
useUpdateCouponMutation,
useVerifyCouponMutation
} = couponApi;
