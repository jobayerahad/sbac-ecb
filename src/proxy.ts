// proxy.ts
import { auth } from './auth'

export default auth

export const config = {
  matcher: '/((?!static|.*\\..*|_next|downloads$|rm-report$|$).*)'
}
