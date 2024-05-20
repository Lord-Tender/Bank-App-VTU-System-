import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/authSlide';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store