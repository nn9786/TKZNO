import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { ROUTE } from '@/constants/route'
import { useAppSelector } from '@/hooks/useStore'

type Props = {
  page: ReactElement
  /** 指定した場合、現在のロールがいずれかに一致しないとダッシュボードへ戻す（未指定なら認証済みなら誰でも閲覧可）。 */
  roles?: Array<'Admin' | 'General'>
}

export const ProtectedRoute = ({ page, roles }: Props) => {
  const token = useAppSelector((state) => state.auth.token)
  const role = useAppSelector((state) => state.auth.role)

  if (!token) return <Navigate to={ROUTE.LOGIN} replace />
  if (roles && (!role || !roles.includes(role))) return <Navigate to={ROUTE.DASHBOARD} replace />
  return page
}
