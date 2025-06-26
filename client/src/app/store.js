import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice.js";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";


export const appStore = configureStore({
    reducer:rootReducer,
    middleware : (defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware,courseApi.middleware, purchaseApi.middleware)
});

const initialiseApp = async()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forcedRefetch:true}))
}

initialiseApp();