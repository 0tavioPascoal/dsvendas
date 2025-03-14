

import { SessionProvider, SessionProviderProps } from "next-auth/react"


const ProviderAuth = ({session, children}: SessionProviderProps) => {
  return(
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}

export default ProviderAuth