/* eslint-disable no-use-before-define */
import { Menu, Button, Space } from 'antd'
import Link from 'next/link'
import { useContext } from 'react'
import styled from 'styled-components'
import { authContext } from 'utils/auth-provider'

const StyledRightMenu = styled.div(({ theme: { colors } }) => `
  
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  & h4{
    font-size: 18px;
    padding: 0;
    margin: 0;
  }

  & span{
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
  const { dispatch, auth: { data } } = useContext(authContext)
  const handleLogout = () => {
    console.log('LOGOUT IS CALLED')
    dispatch({ type: 'LOGOUT_USER' })
  }

  return (
    <Space align="center">
      <h4>
        Welcome
        {' '}
        <span>{data.first_name}</span>
      </h4>

      <Button onClick={handleLogout}>Logout</Button>
    </Space>
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
