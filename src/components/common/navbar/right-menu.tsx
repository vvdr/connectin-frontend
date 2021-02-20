/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import {
  Menu, Avatar, Space, Dropdown,
} from 'antd'
import Link from 'next/link'
import { useContext } from 'react'
import styled from 'styled-components'
import { authContext } from 'utils/auth-provider'
import { useRouter } from 'next/router'
import { UserOutlined } from '@ant-design/icons'

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
  
  & .dropdown-menu-item{
    
  }
`)

const StyledDropdownMenu = styled(Menu)`
  min-width: 150px;
`

const RightMenu = () => {
  const { isAuthenticated } = useContext(authContext)

  return (
    <StyledRightMenu>
      {isAuthenticated ? <SignedMenu /> : <LogoutMenu /> }
    </StyledRightMenu>
  )
}

function SignedMenu() {
  const router = useRouter()
  const { dispatch, auth: { data } } = useContext(authContext)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_USER' })
    router.push('/')
  }

  const menu = (
    <StyledDropdownMenu>
      <Menu.Item>
        <Link href="/profile"><a>Profile</a></Link>
      </Menu.Item>

      <Menu.Item onClick={handleLogout}>
        Logout
      </Menu.Item>

    </StyledDropdownMenu>
  )

  return (
    <Space align="center">
      <h4>
        Welcome
        {' '}
        <span>{data.first_name}</span>
      </h4>

      <Dropdown overlay={menu}>
        <Avatar size={32} icon={<UserOutlined />} />
        {/* <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Hover me, Click menu item

          <DownOutlined />
        </a> */}
      </Dropdown>
      ,

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
