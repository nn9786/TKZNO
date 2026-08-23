import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import { rootReducer } from '@/store/rootReducer'

// redux-persist/lib/storage の既定インポートは Vite のCJS/ESM相互運用で解決に失敗することがあるため、
// localStorageをラップするだけの同等の実装を直接用意する。
const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value)
    return Promise.resolve()
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key)
    return Promise.resolve()
  },
}

// ui(ローディング件数)は永続化しない。auth/settingのみ次回訪問時も保持する。
const persistedReducer = persistReducer({ key: 'root', storage, whitelist: ['auth', 'setting'] }, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
