import { createReducer } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { changeFilter } from './contacts-actions';

export const filterReducer = createReducer('', {
  [changeFilter]: (_, action) => action.payload,
});

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => '/contacts',
      keepUnusedDataFor: 5,
      providesTags: ['Contacts'],
    }),

    saveContact: builder.mutation({
      query: contact => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),

    editContact: builder.mutation({
      query: ({ changedContact, contactId }) => {
        return {
          url: `/contacts/${contactId}`,
          method: 'PATCH',
          body: changedContact,
        };
      },
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useSaveContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactsApi;
