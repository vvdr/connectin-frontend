import { Row, Col } from 'antd'
import Form from './form'

const ContactComp: React.FC = () => (
  <>
    <Row>
      <Col xs={24} sm={{ span: 16, offset: 4 }}>
        <h2>Contact Us</h2>
        <Form />
      </Col>
    </Row>
  </>
)

export default ContactComp
