/* eslint-disable max-len */
import { Row, Col } from 'antd'
import styled from 'styled-components'

const StyledAbout = styled.div`
  & p{
    font-size: 18px;
  }
`

const StyledHeading = styled.div`
  margin: 20px 0;
  font-size: 24px;
`

const ProfileComp: React.FC = () => (
  <StyledAbout>
    <Row>
      <Col xs={24} sm={{ span: 16, offset: 4 }}>
        <StyledHeading>
          <h3>Profile Page</h3>
        </StyledHeading>

      </Col>
    </Row>
  </StyledAbout>
)

export default ProfileComp
