import { useCallback, useState } from 'react'

/** Takazono.Oliveの`useBoolean`を踏襲した、開閉状態を扱う小さな共通フック。 */
export const useBoolean = (initialState = false) => {
  const [state, setState] = useState(initialState)

  const setTrue = useCallback(() => setState(true), [])
  const setFalse = useCallback(() => setState(false), [])
  const toggle = useCallback(() => setState((prev) => !prev), [])

  return [state, setTrue, setFalse, toggle] as const
}
