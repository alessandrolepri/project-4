import React from 'react'
import { List, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Settings from '../../lib/Settings'
import moment from 'moment'

const MessageList = ({ messageData, information }) => {
  const {created_at, receiver,sender, id } = messageData// eslint-disable-line
  const {username } = sender || receiver
  return(
    <List.Item>
      <Link
        to={`/messages/${id}/show`}>
        <Image avatar src='https://pngimage.net/wp-content/uploads/2018/05/default-user-png-2.png' />
        <List.Content>
          <List.Header as='p'>{username}</List.Header>
          <List.Description  as='p'>{`Message was ${information} at :  ${moment(created_at).format('dddd HH:mm')}`}</List.Description>{/*  eslint-disable-line*/}

        </List.Content>


      </Link>
    </List.Item>

  )

}






export default MessageList
