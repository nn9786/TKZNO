import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  token: string | null
  sid: number | null
  userName: string | null
  name: string | null
  role: 'Admin' | 'General' | null
}

const initialState: AuthState = {
  token: null,
  sid: null,
  userName: null,
  name: null,
  role: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (
      state,
      action: PayloadAction<{ token: string; sid: number; userName: string; name: string; role: 'Admin' | 'General' }>
    ) => {
      state.token = action.payload.token
      state.sid = action.payload.sid
      state.userName = action.payload.userName
      state.name = action.payload.name
      state.role = action.payload.role
    },
    loggedOut: (state) => {
      state.token = null
      state.sid = null
      state.userName = null
      state.name = null
      state.role = null
    },
  },
})

export const { loggedIn, loggedOut } = authSlice.actions
export default authSlice.reducer
