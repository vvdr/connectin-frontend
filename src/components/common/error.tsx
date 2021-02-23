import { Result } from 'antd'

type Props = {
  message: string
}

const Error: React.FC<Props> = ({ message }: Props) => (
  <Result
    status="error"
    title={message}
  />
)

export default Error
