import { useLocation } from 'react-router-dom'

import { ROUTE } from '@/constants/route'
import { useAppSelector } from '@/hooks/useStore'

export type KengenAction = 'create' | 'update' | 'delete' | 'updateOrder'

type ScreenKengen = Partial<Record<KengenAction, boolean>>

/**
 * 画面パス→操作→Generalロールでの可否を表す権限マトリクス（Adminは常に全操作可のため定義不要）。
 * Takazono.Oliveの`useKengen`（4ロール×画面パスの巨大マトリクス）を、教材の2ロール構成に合わせて簡略化したもの。
 * 現状はどのマスタもGeneralは参照のみ（バックエンドの`[Authorize(Roles = "Admin")]`と一致）だが、
 * 画面ごとに権限を変えたくなった場合はこのマトリクスにエントリを追加するだけでよい。
 */
const GENERAL_PERMISSIONS: Record<string, ScreenKengen> = {
  [ROUTE.MASTER_UNIT]: { create: false, update: false, delete: false, updateOrder: false },
  [ROUTE.MASTER_STORE]: { create: false, update: false, delete: false, updateOrder: false },
  [ROUTE.MASTER_SUPPLIER]: { create: false, update: false, delete: false, updateOrder: false },
  [ROUTE.MASTER_CUSTOMER]: { create: false, update: false, delete: false, updateOrder: false },
  // Userマスタ自体がルーティング側でAdmin限定（`ProtectedRoute roles={['Admin']}`）のため実質到達しないが、
  // 他マスタと同じ「ボタンをcan()でガードする」パターンを崩さないために明示しておく。
  [ROUTE.MASTER_USER]: { create: false, update: false, delete: false },
}

/** Takazono.Oliveの`useKengen`と同じ使用感（`const { can } = useKengen()`）で、現在画面×操作の権限を判定するフック。 */
export const useKengen = () => {
  const role = useAppSelector((state) => state.auth.role)
  const { pathname } = useLocation()

  const can = (action: KengenAction): boolean => {
    if (role === 'Admin') return true
    return GENERAL_PERMISSIONS[pathname]?.[action] ?? false
  }

  return { can }
}
