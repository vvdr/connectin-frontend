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

const AboutComp: React.FC = () => (
  <StyledAbout>
    <Row>
      <Col xs={24} sm={{ span: 16, offset: 4 }}>
        <StyledHeading>
          <h3>About Connectin</h3>
        </StyledHeading>
        <p>I am not sure how many of you have been significantly impacted due to the virtual world created by COVID. Some are calling it new normal or next normal. I have been impacted in many ways. One of them being my ability to network, no more in person meetings, hallway chats, cafeteria lunches. This probably is true for most people who work at big organizations with beautiful campuses built for collaboration. As we are dealing with this virtual world we have to do everything via a voice or video call. We have more meetings than before, the time we saved driving has also vanished as time progressed. Its upon us to make time to connect with people. This app is a simple attempt to solve that problem, to give a nudge to people like me who are not doing a great job connecting with people and losing their social capital.</p>
      </Col>
    </Row>
  </StyledAbout>
)

export default AboutComp
