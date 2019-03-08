import React from 'react'
import { Header, Form, Button, Segment, List, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'
import moment from 'moment'

const CommentFeed = ({ data, nightMode, postComment, handleChange, commentData , deleteComment }) => {
  return(
    <Segment textAlign='left' inverted={nightMode}>
      <Header inverted={nightMode} as='h3'>
        Comments
      </Header>


      <Form inverted={nightMode} onSubmit={postComment}>
        <Form.TextArea name='text' onChange={handleChange} value={commentData.text} />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>

      <List inverted={nightMode} selection animated relaxed>
        {data.comments.slice().reverse().map(comment =>
          <List.Item key={comment.id}>
            {Auth.isAuthenticated() && (comment.user.id === Auth.getUserID()) &&
            <List.Content floated='right'>
              <Button
                onClick={(e) => deleteComment(e, comment.id)}
                circular icon='trash'
                inverted={nightMode} />
            </List.Content>
            }

            <List.Content>
              <List.Header as='h4'> <Link to={`/users/${comment.user.id}`}>{comment.user.username} posted on {moment(comment.created_at).format('dddd HH:mm')}</Link></List.Header>
              <List.Description> {comment.text} </List.Description>
            </List.Content>
            <Divider />
          </List.Item>
        )}
      </List>

    </Segment>
  )
}


export default CommentFeed
