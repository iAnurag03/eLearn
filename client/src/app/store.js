import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice.js";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/courseProgressApi.js";


export const appStore = configureStore({
    reducer:rootReducer,
    middleware : (defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware,courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
});

const initialiseApp = async()=>{
    // Check if there's a token in cookies before trying to load user
    const hasToken = document.cookie.includes('token=');
    if (hasToken) {
        try {
            // Use a timeout to prevent hanging requests
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 5000)
            );
            
            await Promise.race([
                appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forcedRefetch:true})),
                timeoutPromise
            ]);
        } catch (error) {
            // If loadUser fails or times out, don't retry - user is not authenticated
            console.log("Failed to load user on app initialization:", error.message);
        }
    }
}

initialiseApp();