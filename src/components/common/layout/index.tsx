/* eslint-disable react/prop-types */
import Navbar from 'components/common/navbar'
import Footer from 'components/common/footer'
import styled from 'styled-components'
import BaseLayout from './base-layout'

const StyledMain = styled.main`
  margin-top: 40px;
`
const Layout: React.FC = ({ children }) => (
  <BaseLayout>
    <Navbar />
    <StyledMain>
      {children}
    </StyledMain>
    <Footer />
  </BaseLayout>
)

export default Layout
