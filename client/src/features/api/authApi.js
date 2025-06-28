import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut} from "../authSlice.js"
import { courseApi } from "./courseApi.js"
import { purchaseApi } from "./purchaseApi.js"
import { courseProgressApi } from "./courseProgressApi.js"

const USER_API = "http://localhost:8080/api/v1/user/"

// Custom base query with error handling
const baseQueryWithErrorHandling = fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        // Add any custom headers if needed
        return headers;
    },
});

// Utility function to reset all API states
export const resetAllApiStates = (dispatch) => {
    dispatch(authApi.util.resetApiState());
    dispatch(courseApi.util.resetApiState());
    dispatch(purchaseApi.util.resetApiState());
    dispatch(courseProgressApi.util.resetApiState());
};

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQueryWithErrorHandling(args, api, extraOptions);
        
        // Handle 401 errors globally
        if (result.error && result.error.status === 401) {
            // Don't log 401 errors to console to reduce noise
            // The individual endpoints will handle the state clearing
            return result;
        }
        
        return result;
    },
    tagTypes: ['User'],
    endpoints : (builder)=>({
        registerUser: builder.mutation({
            query : (inputData)=>({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser: builder.mutation({
            query : (inputData)=>({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                }catch(error){
                    console.log(error)
                }
            }
        }),
        loadUser : builder.query({
            query:()=>({
                url:"profile",
                method:"GET"
            }),
            providesTags: ['User'],
            async onQueryStarted(_, {queryFulfilled, dispatch, getState}){
                try{
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                }catch(error){
                    // Only log non-401 errors to reduce console noise
                    if (error?.error?.status !== 401) {
                        console.log("Load user error:", error);
                    }
                    // If loadUser fails (401, etc.), clear all caches and user state
                    // But only if we're not already logged out
                    const state = getState();
                    if (state.auth.isAuthenticated) {
                        dispatch(userLoggedOut());
                        resetAllApiStates(dispatch);
                    }
                }
            },
            // Don't retry on 401 errors
            retry: (failureCount, error) => {
                if (error?.status === 401) {
                    return false; // Don't retry on unauthorized
                }
                return failureCount < 3; // Retry up to 3 times for other errors
            }
        }),
        updateUser : builder.mutation({
            query:(FormData)=>({
                url:"profile/update",
                method:"PUT",
                body:FormData
            }),
            invalidatesTags: ['User']
        }),
        logoutUser : builder.mutation({
            query:()=>({
                url:"logout",
                method:"GET",
            }),
            async onQueryStarted(_,{queryFulfilled, dispatch}){
                try{
                    await queryFulfilled; // Wait for logout to complete
                    dispatch(userLoggedOut());
                    
                    // Clear all API caches to prevent stale data
                    resetAllApiStates(dispatch);
                    
                    // Also clear token from cookies to prevent unauthorized errors
                    clearToken();
                    
                }catch(error){
                    console.log("Logout error:", error);
                    // Even if logout fails, clear the local state and caches
                    dispatch(userLoggedOut());
                    resetAllApiStates(dispatch);
                    clearToken();
                }
            }
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery, useUpdateUserMutation, useLogoutUserMutation  
} = authApi

// Custom hook to conditionally load user data
export const useConditionalLoadUser = () => {
    const hasToken = document.cookie.includes('token=');
    return useLoadUserQuery(undefined, {
        skip: !hasToken, // Skip the query if there's no token
    });
};

// Utility function to check if user has a valid token
export const hasValidToken = () => {
    return document.cookie.includes('token=');
};

// Utility function to clear token from cookies
export const clearToken = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};