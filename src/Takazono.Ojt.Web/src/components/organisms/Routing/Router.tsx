import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from '@/components/organisms/Routing/ProtectedRoute'
import { Dashboard } from '@/components/pages/Dashboard'
import { Login } from '@/components/pages/Login'
import { Customer, MasterMenu, Store, Supplier, Unit, User } from '@/components/pages/Master'
import { ROUTE } from '@/constants/route'

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path={ROUTE.LOGIN} element={<Login />} />
      <Route path={ROUTE.DASHBOARD} element={<ProtectedRoute page={<Dashboard />} />} />
      <Route path={ROUTE.MASTER_MENU} element={<ProtectedRoute page={<MasterMenu />} />} />
      <Route path={ROUTE.MASTER_UNIT} element={<ProtectedRoute page={<Unit />} />} />
      <Route path={ROUTE.MASTER_STORE} element={<ProtectedRoute page={<Store />} />} />
      <Route path={ROUTE.MASTER_USER} element={<ProtectedRoute page={<User />} roles={['Admin']} />} />
      <Route path={ROUTE.MASTER_SUPPLIER} element={<ProtectedRoute page={<Supplier />} />} />
      <Route path={ROUTE.MASTER_CUSTOMER} element={<ProtectedRoute page={<Customer />} />} />
      <Route path="*" element={<Navigate to={ROUTE.DASHBOARD} replace />} />
    </Routes>
  </Router>
)
