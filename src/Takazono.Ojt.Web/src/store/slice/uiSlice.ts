import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type DialogState = {
  isOpen: boolean
  title: string
  message: string
}

type UiState = {
  loadingCount: number
  dialog: DialogState
}

const initialState: UiState = {
  loadingCount: 0,
  dialog: { isOpen: false, title: '', message: '' },
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
    /** 画面のどこからでも呼び出せる汎用エラーダイアログを開く（`useErrorDialog`経由での利用を想定）。 */
    dialogOpened: (state, action: PayloadAction<{ title: string; message: string }>) => {
      state.dialog = { isOpen: true, ...action.payload }
    },
    dialogClosed: (state) => {
      state.dialog.isOpen = false
    },
  },
})

export const { loadingStarted, loadingFinished, dialogOpened, dialogClosed } = uiSlice.actions
export default uiSlice.reducer
