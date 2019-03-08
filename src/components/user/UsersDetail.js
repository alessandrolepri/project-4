import React from 'react'
import StoryCard from './StoryCard'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import Settings from '../../lib/Settings'
import { Statistic, Grid, Image,Header,Divider, Button, Icon } from 'semantic-ui-react'

const UsersDetail = ({usersDetail, handleUnfollowEvent, handleFollowEvent, handleUsersMessagingEvent}) => {

  const { username, followers, following, stories_written,id } = usersDetail // eslint-disable-line
  const nightMode = Settings.isNightMode()
  return(

    <Grid columns={1} stackable textAlign='center'>
      <Grid.Column width={8}  >
        <Header inverted={nightMode} as='h1' icon textAlign='center'>
          <Header.Content>{username}</Header.Content>
        </Header>


        <Image src='https://pngimage.net/wp-content/uploads/2018/05/default-user-png-2.png' size='medium' circular centered/>

        <Divider  hidden />
        {
          id !== Auth.getUserID() &&
          (
            followers.some(f => f.id === Auth.getUserID())  ? (
              <Button positive className='detail' onClick={handleUnfollowEvent}> <Icon name='check circle'/>Following</Button>
            ) : (
              <Button primary className='detail' onClick={handleFollowEvent}><Icon name='add user'/>Follow</Button>
            )
          )
        }

        {
          id !== Auth.getUserID() &&
          (
            <Button primary className='detail' onClick={handleUsersMessagingEvent}> <Icon name='comments'/>Message User</Button>
          )
        }

        <Divider hidden />

        <Grid columns={3} stackable textAlign='center'>
          <Statistic inverted={nightMode} label='followers' value={(followers.length+0.00).toLocaleString()} />
          <Statistic inverted={nightMode} label='followings' value={(following.length+0.00).toLocaleString()} />
          <Statistic inverted={nightMode} label='posts' value={(stories_written.length+0.00).toLocaleString()} />
        </Grid>

        <Divider  />

        {stories_written.length> 0  ? (
          stories_written.map(story =>
            <Link to ={{
              pathname: `/stories/${story.id}`,
              state: {
                reddit: false,
                storyId: story.id
              }}}  key={story.id}>
              <StoryCard key={story.id} story={story}/>
            </Link>

          )

        ) : (
          <p>User has not posted any stories</p>
        )}

      </Grid.Column>
    </Grid>

  )

}

export default UsersDetail
