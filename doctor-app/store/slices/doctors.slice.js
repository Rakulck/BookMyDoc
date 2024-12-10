import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/baseQuery';
import { AlertNotification } from '../../components/AlertNotification';

export const DoctorsSlice = createApi({
  reducerPath: 'doctorsSlice',
  baseQuery: axiosBaseQuery({
    baseUrl: '',
  }),
  tagTypes: ['Doctors', 'DoctorDetails'],
  endpoints(build) {
    return {
      getDoctors: build.query({
        query: (query) => {
          delete query?.refresh;
          return {
            url: `/doctors`,
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
          AlertNotification({
            title: response.message,
            textBody: error?.message || error,
            variant: 'toast',
            type: 'danger',
          });
          return response;
        },
        // keepUnusedDataFor: 60,
        forceRefetch({ currentArg, previousArg }) {
          const refresh = currentArg?.refresh;
          delete currentArg?.refresh;
          return (
            JSON.stringify(currentArg) !== JSON.stringify(previousArg) ||
            refresh === true
          );
        },
        providesTags: ['Doctors'],
      }),
      getDoctorDetails: build.query({
        query: (query) => {
          delete query?.refresh;
          return {
            url: `/doctors/${query?.id}`,
            method: 'get',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            params: query?.params,
          };
        },
        transformResponse: async (response) => {
          return response?.data;
        },
        transformErrorResponse: (response) => {
          const error = response?.error;
          AlertNotification({
            title: response.message,
            textBody: error?.message || error,
            variant: 'toast',
            type: 'danger',
          });
          return response;
        },
        // keepUnusedDataFor: 60,
        forceRefetch({ currentArg, previousArg }) {
          const refresh = currentArg?.refresh;
          delete currentArg?.refresh;
          return (
            JSON.stringify(currentArg) !== JSON.stringify(previousArg) ||
            refresh === true
          );
        },
        providesTags: ['DoctorDetails'],
      }),
    };
  },
});

export const { useGetDoctorsQuery, useGetDoctorDetailsQuery } = DoctorsSlice;
