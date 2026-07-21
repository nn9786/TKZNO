import type { ReactElement } from 'react'

import { Navigate } from 'react-router-dom'

import { ROUTE } from '@/constants/route'
import { useAppSelector } from '@/hooks/useStore'

type Props = {
  page: ReactElement
}

export const ProtectedRoute = ({ page }: Props) => {
  const token = useAppSelector((state) => state.auth.token)
  return token ? page : <Navigate to={ROUTE.LOGIN} replace />
}
