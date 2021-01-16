/* eslint-disable react/display-name */
import {
  Row, Col, List, Spin,
} from 'antd'
import { useEffect, useState } from 'react'
import { getConnect } from 'services/connects'
import { useRouter } from 'next/router'
import { Connect } from 'types/connect'
import moment from 'moment-timezone'
import Moment from 'react-moment'

const timezone = moment.tz.guess()

console.log('TIMESONE ', timezone)
const SingleConnectComp: React.FC = () => {
  const [connect, setConnect] = useState<Connect>()
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { connect_id } = router.query
  console.log('CONNECTION ID: ', connect_id)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const { data } = await getConnect(connect_id)
        console.log('DATA: ', data)
        if (data.errors) {
          console.log('SOMETHING WENT WRONG: ', data.errors)
        } else {
          const connectData = data.data.connects[0]
          console.log('CONNECT DATA;', connect)
          setConnect(connectData)
        }
      } catch (error) {
        console.log('SOMETHING WENT WRONG,', error)
        // setIsError(true);
      }

      setLoading(false)
    }

    // Temporary hack to fix axios default header on nextjs direct call to server page
    if (connect_id) { setTimeout(() => fetchData(), 500) }
    // fetchData();
  }, [connect_id])

  const {
    first_name, last_name, email, phone_number,
    frequency, company_name, notes_about_them,
    notes_advice_wanted,
    notes_what_is_common,
    next_reminder_date,
  } = connect || {}

  return (

    <Spin spinning={loading}>
      <Row>

        <Col md={{ span: 20, offset: 2 }}>
          <h3>
            Connect with
            {' '}
            {`${first_name} ${last_name}`}
          </h3>
          <List
            itemLayout="horizontal"
          >
            <Row>
              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    title="First Name"
                    description={first_name}
                  />
                </List.Item>
              </Col>

              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    title="Last Name"
                    description={last_name}
                  />

                </List.Item>
              </Col>

              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    title="Email"
                    description={email}
                  />

                </List.Item>
              </Col>

              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    title="Phone Number"
                    description={phone_number}
                  />
                </List.Item>
              </Col>

              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    title="Company Name"
                    description={company_name}
                  />
                </List.Item>
              </Col>

              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    title="Frequency"
                    description={frequency}
                  />
                </List.Item>
              </Col>

              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    title="Notes About Them"
                    description={notes_about_them}
                  />
                </List.Item>
              </Col>

              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    title="Notes Advice Wanted"
                    description={notes_advice_wanted}
                  />
                </List.Item>
              </Col>

              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    title="Notes What is common"
                    description={notes_what_is_common}
                  />
                </List.Item>
              </Col>

              <Col span={6}>
                <List.Item>
                  <List.Item.Meta
                    description={<Moment date={moment.utc(next_reminder_date).tz(timezone)} format="dddd, MMMM Do YYYY, h:mm:ss a" />}
                  />
                </List.Item>
              </Col>

            </Row>
          </List>
        </Col>

      </Row>
    </Spin>
  )
}
export default SingleConnectComp
