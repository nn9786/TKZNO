import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { Preview } from '@storybook/react-vite'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store/store'
import { theme } from '@/styles/theme'

/** アプリ本体（`src/App.tsx`）と同じProviderの積み重ねをStorybook上でも再現する。
 * ルーティングだけは実際のAppRouterの代わりにMemoryRouterを使う（`useNavigate`等を使う分子コンポーネント向け）。 */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
              <MemoryRouter>
                <Story />
              </MemoryRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    ),
  ],
}

export default preview
