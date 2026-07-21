import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Dashboard } from '@/components/pages/Dashboard'
import { Login } from '@/components/pages/Login'
import { MasterMenu } from '@/components/pages/Master/MasterMenu'
import { Store } from '@/components/pages/Master/Store'
import { Unit } from '@/components/pages/Master/Unit'
import { ProtectedRoute } from '@/components/organisms/Routing/ProtectedRoute'
import { ROUTE } from '@/constants/route'

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path={ROUTE.LOGIN} element={<Login />} />
      <Route path={ROUTE.DASHBOARD} element={<ProtectedRoute page={<Dashboard />} />} />
      <Route path={ROUTE.MASTER_MENU} element={<ProtectedRoute page={<MasterMenu />} />} />
      <Route path={ROUTE.MASTER_UNIT} element={<ProtectedRoute page={<Unit />} />} />
      <Route path={ROUTE.MASTER_STORE} element={<ProtectedRoute page={<Store />} />} />
      <Route path="*" element={<Navigate to={ROUTE.DASHBOARD} replace />} />
    </Routes>
  </Router>
)
