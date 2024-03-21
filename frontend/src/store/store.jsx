import { configureStore} from "@reduxjs/toolkit";
import dataReducer from "../slice/data"

export const store = configureStore({
    reducer:{
        data : dataReducer
    }
})