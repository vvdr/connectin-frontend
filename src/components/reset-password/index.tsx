import { Row, Col } from 'antd'
import Form from './form'

type Props ={
  token: string;
}
const ResetPasswordComp: React.FC<Props> = ({ token } : Props) => (
  <>
    <Row>
      <Col xs={24} sm={{ span: 8, offset: 8 }}>
        <h2>Reset Password</h2>
        <Form token={token} />
      </Col>
    </Row>
  </>
)

export default ResetPasswordComp
