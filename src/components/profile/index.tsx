/* eslint-disable max-len */
import { useEffect, useState } from 'react'
import {
  Row, Col, List,
} from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { getUser } from 'services/user'

const StyledProfile = styled.div`
  & p{
    font-size: 18px;
  }
`

const StyledHeading = styled.div`
  margin: 20px 0;
  font-size: 24px;
`

const ProfileComp: React.FC = () => {
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUser()
        if (data.errors) {
          console.log('SOMETHING WENT WRONG: - GETTING USER DATA ', data.errors)
        } else {
          setUser(data.data?.users[0])
        }
      } catch (error) {
        console.log('SOMETHING WENT WRONG,', error)
      }
    }

    // Temporary hack to fix axios default header on nextjs direct call to server page
    setTimeout(() => fetchData(), 100)
  }, [])

  const {
    first_name, last_name, email, company_name, phone_number,
  } = user

  return (
    <StyledProfile>
      <Row>
        <Col xs={24} sm={{ span: 16, offset: 4 }}>
          <StyledHeading>
            <h3>Profile Page</h3>
          </StyledHeading>
          <List
            header={<Link key="edit-button" href="/profile/edit"><a>Edit Profile</a></Link>}

          >
            <List.Item>
              <List.Item.Meta title="First Name" description={first_name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="First Name" description={last_name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Email" description={email} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Company" description={company_name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Phone" description={phone_number} />
            </List.Item>
          </List>
        </Col>
      </Row>
    </StyledProfile>
  )
}

export default ProfileComp
