import { useContext, useEffect } from 'react'
import Router from 'next/router'
import { authContext } from 'utils/auth-provider'

type Props = {
  children: React.ReactNode
}

const ProtectedPage:React.FC<Props> = ({ children }: Props) => {
  const { auth, isAuthenticated } = useContext(authContext)
  console.log('AUTHCONTEXT  in protected route ', auth)

  useEffect(() => {
    if (!isAuthenticated) { Router.replace('/login') }
  }, [])

  return (
    <>
      {isAuthenticated ? children : null}
    </>
  )
}

export default ProtectedPage
