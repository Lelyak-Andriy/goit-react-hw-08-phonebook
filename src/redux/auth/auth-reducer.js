import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { onError } from '../../helpers/notifications';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    registerUser: builder.mutation({
      queryFn: async (newUser, queryApi, extraOptions, baseQuery) => {
        const res = await baseQuery({
          url: '/users/signup',
          method: 'POST',
          body: newUser,
        })
          .then(response => {
            if (response.error) {
              switch (response.error.status) {
                case 400:
                  onError('Input error');
                  return {
                    error: { status: 400, data: 'Input error' },
                  };
                case 404:
                  onError('Not found');
                  return {
                    error: { status: 404, data: 'Not found' },
                  };
                case 500:
                  onError('Servers error');
                  return { error: { status: 500, data: 'Servers error' } };
                default:
                  return response.error;
              }
            }
            return response;
          })
          .catch(error => error);
        return res;
      },
      invalidatesTags: ['Auth'],
    }),
    loginUser: builder.mutation({
      queryFn: async (userData, queryApi, extraOptions, baseQuery) => {
        const res = await baseQuery({
          url: `/users/login`,
          method: 'POST',
          body: userData,
        })
          .then(response => {
            if (response.error) {
              switch (response.error.status) {
                case 400:
                  onError('Input error');
                  return {
                    error: { status: 400, data: 'Input error' },
                  };
                case 404:
                  onError('Not found');
                  return {
                    error: { status: 404, data: 'Not found' },
                  };
                default:
                  return response.error;
              }
            }
            return response;
          })
          .catch(error => error);
        return res;
      },
      invalidatesTags: ['Auth'],
    }),
    logoutUser: builder.mutation({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        const res = await baseQuery({
          url: '/users/logout',
          method: 'POST',
        })
          .then(response => {
            if (response.error) {
              switch (response.error.status) {
                case 401:
                  onError('No authorization');
                  return {
                    error: { status: 401, data: 'No authorization' },
                  };
                case 404:
                  onError('Not found');
                  return {
                    error: { status: 404, data: 'Not found' },
                  };
                case 500:
                  onError('Servers error');
                  return {
                    error: { status: 500, data: 'Servers error' },
                  };
                default:
                  return response.error;
              }
            }
            return response;
          })
          .catch(error => error);
        return res;
      },
      invalidatesTags: ['Auth'],
    }),

    fetchCurrentUser: builder.query({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        const res = await baseQuery({
          url: '/users/current',
        })
          .then(response => {
            if (response.error) {
              switch (response.error.status) {
                case 401:
                  onError('No authorization');
                  return {
                    error: { status: 401, data: 'No authorization' },
                  };
                case 404:
                  onError('Not found');
                  return {
                    error: { status: 404, data: 'Not found' },
                  };
                default:
                  return response.error;
              }
            }
            return response;
          })
          .catch(error => error);
        return res;
      },
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useFetchCurrentUserQuery,
} = authApi;
