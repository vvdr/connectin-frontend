import { Row, Col } from 'antd';
import Form from './form';

const ForgotPasswordComp: React.FC = () => (
  <>
    <Row>
      <Col xs={24} sm={{ span: 8, offset: 8 }}>
        <h2>Reset Password</h2>
        <Form />
      </Col>
    </Row>
  </>
);

export default ForgotPasswordComp;
