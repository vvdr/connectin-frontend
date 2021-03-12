/* eslint-disable max-len */
import { useEffect, useState } from 'react'
import {
  Row, Col, List, Popover, Button,
} from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { getUser } from 'services/user'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
    first_name, last_name, email, company_name, phone_number, invite_code, gender, birth_year, race, city, state, country, job_title, department,
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
              <p>
                First Name:
                {' '}
                {first_name}
              </p>

            </List.Item>
            <List.Item>
              <p>
                Last Name:
                {' '}
                {last_name}
                {' '}
              </p>
            </List.Item>
            <List.Item>
              <p>
                Email:
                {' '}
                {email}
              </p>

            </List.Item>
            <List.Item>
              <p>
                Company:
                {' '}
                {company_name}
              </p>

            </List.Item>
            <List.Item>
              <p>
                Job Title:
                {' '}
                {job_title}
              </p>

            </List.Item>
            <List.Item>
              <p>
                Department:
                {' '}
                {department}
              </p>

            </List.Item>
            <List.Item>
              <p>
                Phone:
                {' '}
                {phone_number}
              </p>
            </List.Item>
            <List.Item>
              <p>
                Gender:
                {' '}
                {gender}
              </p>
            </List.Item>
            <List.Item>
              <p>
                Birth Year:
                {' '}
                {birth_year}
              </p>
            </List.Item>
            <List.Item>
              <p>
                Race:
                {' '}
                {race}
              </p>
            </List.Item>
            <List.Item>
              <p>
                City:
                {' '}
                {city}
              </p>
            </List.Item>
            <List.Item>
              <p>
                State:
                {' '}
                {state}
              </p>
            </List.Item>
            <List.Item>
              <p>
                Country:
                {' '}
                {country}
              </p>
            </List.Item>

            <List.Item>
              {invite_code && (
              <p>
                Invitation Code:
                {'  '}
                {invite_code}

                <CopyToClipboard text={`${process.env.NEXT_PUBLIC_BASE_URL}/register?inviteCode=${invite_code}`}>
                  <Popover placement="rightTop" content="Copy" trigger="click">
                    <Button>Copy to Clipboard</Button>
                  </Popover>
                </CopyToClipboard>
              </p>
              )}

            </List.Item>
          </List>
        </Col>
      </Row>
    </StyledProfile>
  )
}

export default ProfileComp
