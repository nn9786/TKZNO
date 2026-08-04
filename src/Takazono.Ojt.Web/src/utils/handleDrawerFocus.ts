import type { RefObject } from 'react'

/** 開いていたドロワー/ダイアログが全て閉じたら、指定した要素にフォーカスを戻す（Takazono.Oliveの`handleDrawerFocus`を踏襲）。 */
export const handleDrawerFocus = (drawerStates: boolean[], focusTargetRef: RefObject<HTMLElement | null>) => {
  if (drawerStates.every((state) => !state) && focusTargetRef.current) {
    focusTargetRef.current.focus()
  }
}
