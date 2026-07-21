import { isAxiosError } from 'axios'

/** ASP.NET Core側のProblemDetails（{title, detail, status}）からユーザー向けメッセージを取り出す。 */
export const extractErrorMessage = (error: unknown, fallback: string): string => {
  if (isAxiosError(error)) {
    const problem = error.response?.data as { detail?: string; title?: string } | undefined
    return problem?.detail ?? problem?.title ?? fallback
  }
  return fallback
}
