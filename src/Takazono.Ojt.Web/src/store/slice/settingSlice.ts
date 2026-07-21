import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Language = 'ja' | 'en'

type SettingState = {
  language: Language
}

const initialState: SettingState = {
  language: 'ja',
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    languageChanged: (state, action: PayloadAction<Language>) => {
      state.language = action.payload
    },
  },
})

export const { languageChanged } = settingSlice.actions
export default settingSlice.reducer
