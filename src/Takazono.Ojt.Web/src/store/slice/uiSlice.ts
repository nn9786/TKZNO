import { createSlice } from '@reduxjs/toolkit'

type UiState = {
  loadingCount: number
}

const initialState: UiState = {
  loadingCount: 0,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    loadingStarted: (state) => {
      state.loadingCount += 1
    },
    loadingFinished: (state) => {
      state.loadingCount = Math.max(0, state.loadingCount - 1)
    },
  },
})

export const { loadingStarted, loadingFinished } = uiSlice.actions
export default uiSlice.reducer
