/* eslint-disable no-use-before-define */
import { Menu, Button } from 'antd'
import Link from 'next/link'
import { useContext } from 'react'
import styled from 'styled-components'
import { authContext } from 'utils/auth-provider'

const StyledRightMenu = styled.div(({ theme: { colors } }) => `

  & .phone a{
    font-size: 24px; 
    color: ${colors.primary};
  }
`)

const RightMenu = () => {
  const { isAuthenticated } = useContext(authContext)

  return (
    <StyledRightMenu>
      {isAuthenticated ? <SignedMenu /> : <LogoutMenu /> }
    </StyledRightMenu>
  )
}

function SignedMenu() {
  const { dispatch } = useContext(authContext)
  const handleLogout = () => {
    console.log('LOGOUT IS CALLED')
    dispatch({ type: 'LOGOUT_USER' })
  }

  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={handleLogout}>Logout</Button>
      </Menu.Item>
    </Menu>
  )
}

function LogoutMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default RightMenu
