import authReducer from "../features/authSlice.js"
import { combineReducers} from "@reduxjs/toolkit"
import { authApi } from "@/features/api/authApi"

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer
});

export default rootReducer;