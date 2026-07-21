import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '@/store/slice/authSlice'
import settingReducer from '@/store/slice/settingSlice'
import uiReducer from '@/store/slice/uiSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  ui: uiReducer,
})

export type RootState = ReturnType<typeof rootReducer>
