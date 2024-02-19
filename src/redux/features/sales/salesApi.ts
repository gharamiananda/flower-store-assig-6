import { TQueryParam } from 'types/global.types';
import { baseApi } from '../../api/baseApi';

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSales: builder.mutation({
      query: (sales) => ({
        url: '/sales',
        method: 'POST',
        body: sales,
      }),
      invalidatesTags:['sales','product','me']
    }),
    getSales: builder.query({
    
        query: (query) => {
  
                   const params = new URLSearchParams();
    
            if (query) {
              query.forEach((item: TQueryParam) => {
                params.append(item.name, item.value as string);
              });
            }
  
        return { url: 'sales',
        params:params,
  
          method: 'GET'}
        },
      providesTags:['sales']
    }),
  }),
});

export const { useAddSalesMutation, useGetSalesQuery} = salesApi;
