import React from 'react'
import FlipPage from 'react-flip-page'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../common/LoadingPage'
import { Segment, Header, Divider, Container, Button, Grid } from 'semantic-ui-react'
import DesktopIndex from './DesktopIndex'
import Auth from '../../lib/Auth'

const headers = {headers: { Authorization: Auth.getToken() }}

const IndexFlipper = ({ style, stories, addToReadList, loadMore, reddit }) => {
  return(
    <div id='flipper'>
      <Divider section hidden />
      <FlipPage
        responsive
        orientation='horizontal'
        style={{ touchAction: 'none' }}
      >
        {stories.map((story, index) =>
          <Segment
            textAlign='center'
            style={style}
            className='index-card'
            key={story.id}
          >
            <Container>
              <Divider hidden />
              <Header
                as='h2'
              > {story.title} </Header>
              <Divider hidden />
              {story.description &&
                <p className="card-text"><strong> Description: </strong> {story.description}</p>
              }
              <Divider hidden />
              {story.genre &&
                <p className="card-text"><strong> Genre: </strong> {story.genre} </p>
              }
              {story.creator &&
                <div>
                  <p className="card-text"><strong> Author: </strong> {story.creator.username} </p>
                </div>
              }

            </Container>
            <Divider  hidden />
            <Grid stackable columns={3}>
              <Grid.Column width={16}>
                <Link to ={`/stories/info/${story.id}`} >
                  <Button  secondary icon='info' content='Info Page' />
                </Link>

                <Link to ={`/stories/${story.id}`} >
                  <Button  secondary icon='book' content='Read' />
                </Link>
              </Grid.Column>

              <Grid.Column width={10}>
                {reddit && (index === stories.length - 1) &&
                  <Button
                    size='small'
                    onClick={loadMore}
                    primary> Load More
                  </Button>
                }
              </Grid.Column>
            </Grid>
          </Segment>

        )}
      </FlipPage>
    </div>
  )
}


export default IndexFlipper
