
import { baseApi } from '../../api/baseApi';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET'
      }),
      providesTags:['me']
    }),
    getMyDashbaord: builder.query({
      query: () => ({
        url: '/users/my-dashboard',
        method: 'GET'
      }),
      providesTags:['dashboard']
    }),
   
    
  }),
});

export const {  useGetMeQuery , useGetMyDashbaordQuery} = usersApi;
