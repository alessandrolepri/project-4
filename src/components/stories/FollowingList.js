import React from 'react'
import { Segment, List, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Settings from '../../lib/Settings'

const FollowingList = ({ following }) => {
  const nightMode = Settings.isNightMode()
  return(
    <Segment inverted={nightMode}>
      <List animated selection inverted={nightMode}>
        {following.map(person =>
          <List.Item key={person.id}>
            <Image avatar src='https://pngimage.net/wp-content/uploads/2018/05/default-user-png-2.png' />
            <List.Content>
              <Link to={`/users/${person.id}`}>
                <List.Header>{person.username}</List.Header>
              </Link>
            </List.Content>
          </List.Item>
        )}
      </List>
    </Segment>
  )
}



export default FollowingList
