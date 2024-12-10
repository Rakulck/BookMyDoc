import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/baseQuery';
import { ToastErrorMessage } from '../../components/common/ToastMessageWrapper';

export const ServiceSlice = createApi({
  reducerPath: 'serviceSlice',
  baseQuery: axiosBaseQuery({
    baseUrl: '',
  }),
  tagTypes: ['Service'],
  endpoints(build) {
    return {
      // region GET ALL SERVICES
      getAllServices: build.query({
        query: (query) => {
          return {
            url: `/service`,
            method: 'get',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            params: query,
          };
        },
        transformResponse: async (response) => {
          return response?.data;
        },
        transformErrorResponse: (response) => {
          const error = response?.error;
          ToastErrorMessage({
            title: response?.message,
            message: error?.message || error,
          });
          return response;
        },
        // forceRefetch({ currentArg, previousArg }) {
        //   return currentArg !== previousArg;
        // },
        providesTags: ['Service'],
      }),
    };
  },
});

export const { useGetAllServicesQuery } = ServiceSlice;
