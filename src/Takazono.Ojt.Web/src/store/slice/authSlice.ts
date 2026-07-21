import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  token: string | null
  userName: string | null
  role: 'Admin' | 'General' | null
}

const initialState: AuthState = {
  token: null,
  userName: null,
  role: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<{ token: string; userName: string; role: 'Admin' | 'General' }>) => {
      state.token = action.payload.token
      state.userName = action.payload.userName
      state.role = action.payload.role
    },
    loggedOut: (state) => {
      state.token = null
      state.userName = null
      state.role = null
    },
  },
})

export const { loggedIn, loggedOut } = authSlice.actions
export default authSlice.reducer
