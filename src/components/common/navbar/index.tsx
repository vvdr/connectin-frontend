import { useState } from 'react'
import {
  Drawer, Button, Row, Col,
} from 'antd'
import LeftMenu from 'components/common/navbar/left-menu'
import RightMenu from 'components/common/navbar/right-menu'
import styled from 'styled-components'
import Link from 'next/link'

const StyledNavbar = styled.nav(({ theme: { colors } }) => `
  & .logo {
    font-size: 30px;
    font-weight: 500;
    text-align: center;
  }

  & .menuCon {
    display: flex;
  }
  
  & .menuCon .ant-menu-item {
    padding: 0px 5px;
  }
  
  & .menuCon .ant-menu-submenu-title {
    padding: 10px 20px;
  }
  
  & .menuCon .ant-menu-item a,
  & .menuCon .ant-menu-submenu-title a {
    padding: 10px 15px;
  }
  
  & .menuCon .ant-menu-horizontal {
    border-bottom: none;
    line-height: 67px;
  }

  & .ant-menu-horizontal > .ant-menu-item-selected a {
    color: ${colors.primary} !important;
  }

  & .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected{
    color: red !important;
    border-bottom-color: ${colors.primary} !important;
  }
  
  & .menuCon .leftMenu {
    flex: 2
  }
  
  & .menuCon .rightMenu {
    flex: 1;
  }
  
  & .barsMenu {
    float: right;
    height: 32px;
    padding: 6px;
    margin-top: 8px;
    display: none;
    background: none;
  }
  
  & .barsBtn {
    display: block;
    width: 20px;
    height: 2px;
    background: #1890ff;
    position: relative;
  }
  
  & .barsBtn:after,
  & .barsBtn:before {
    content: attr(x);
    width: 20px;
    position: absolute;
    top: -6px;
    left: 0;
    height: 2px;
    background: #1890ff;
  }
  
  & .barsBtn:after {
    top: auto;
    bottom: -6px;
  }
  
  & .ant-drawer-body {
    padding: 0;
  }
  
  & .barsMenu>span {
    display: block;
  }
  
  & .ant-drawer-body .ant-menu-horizontal>.ant-menu-item,
  & .ant-drawer-body .ant-menu-horizontal>.ant-menu-submenu {
    display: inline-block;
    width: 100%;
  }
  
  & .ant-drawer-body .ant-menu-horizontal {
    border-bottom: none;
    
  }
  
  & .ant-drawer-body .ant-menu-horizontal>.ant-menu-item:hover {
    border-bottom-color: transparent;
  }
  
  & .ant-menu {
    font-size: 18px;
  }

  @media (max-width: 767px) {
    & .barsMenu {
      display: inline-block;
    }
  
    & .menuCon{
      justify-content: flex-end;
    }

    & .leftMenu,
    & .rightMenu {
      display: none;
    }
  
    & .logo a {
      margin-left: -20px;
    }
  
    & .menuCon .ant-menu-item,
    & .menuCon .ant-menu-submenu-title {
     padding: 1px 20px;
    }
  
    & .logo a {
      padding: 10px 20px;
    }
  }
`)

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <StyledNavbar>
      <Row justify="center" align="middle">
        <Col xs={{ span: 20 }} sm={{ span: 16 }} md={{ span: 4 }}>
          <div className="logo">
            <Link href="/">
              <a>ConnectIn</a>
            </Link>
          </div>
        </Col>
        <Col xs={{ span: 4 }} sm={{ span: 8 }} md={{ span: 20 }}>
          <div className="menuCon">
            <div className="leftMenu">
              <LeftMenu />
            </div>
            <div className="rightMenu">
              <RightMenu />
            </div>
            <Button className="barsMenu" type="primary" onClick={showDrawer}>
              <span className="barsBtn" />
            </Button>
            <Drawer
              title="ConnectIn"
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              <LeftMenu mode="vertical" />
              <RightMenu />
            </Drawer>
          </div>
        </Col>
      </Row>

    </StyledNavbar>
  )
}

export default Navbar
