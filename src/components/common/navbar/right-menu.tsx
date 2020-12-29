import { Menu } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const StyledRightMenu = styled.div(({ theme: { colors } }) => `

  & .phone a{
    font-size: 24px; 
    color: ${colors.primary};
   
  }
`);

const RightMenu = () => (
  <StyledRightMenu>
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
  </StyledRightMenu>
);

export default RightMenu;
