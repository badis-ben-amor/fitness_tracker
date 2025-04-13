import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReduser from "./slices/userSlice";
import mealReducer from "./slices/mealSlice";

const store = configureStore({
  reducer: { auth: authReducer, user: userReduser, meal: mealReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
