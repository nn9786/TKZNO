import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { AppRouter } from '@/components/organisms/Routing'
import { persistor, store } from '@/store/store'
import { theme } from '@/styles/theme'

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <AppRouter />
        </SnackbarProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
)
