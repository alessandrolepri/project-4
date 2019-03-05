import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Grid, Divider, Header, Button } from 'semantic-ui-react'
import Settings from '../../lib/Settings'

const style = {
  height: '400px',
  backgroundImage: 'url(https://www.rossettiarchive.org/img/9p-1850.virginia.endp4.jpg)',
  backgroundSize: 'cover'

}

class DesktopIndex extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    const { addToReadList, stories } = this.props
    console.log(stories, 'stories')
    stories.forEach(story => console.log('hi'))
    return(
      <Container>
        <Grid columns={3}>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={11}>
            <Segment
              inverted={Settings.isNightMode()}
              id='index-reader'
              className='desktop-index'
              raised
            >
              {stories.map(story =>
                <Segment key={story.id}
                  className='desktop-index'
                  style={style}
                > <Divider hidden />
                  <Header as='h1'> {story.title} </Header>
                  <Divider section hidden />
                  {story.genre &&
                    <Header as='h3'> Genre: <span>{story.genre}</span> </Header>
                  }


                  {story.creator &&
                    <Header as='h3'> Author: {story.creator.username} </Header>
                  }

                  {!story.creator &&
                    <Header as='h3'> Source: Reddit{story.score && <span>({story.score} upvotes)</span>} </Header>
                  }

                  {story.description &&
                    <Header as='h3'>
                    Description: {story.description}
                    </Header>
                  }


                  <Link to ={`/stories/info/${story.id}`} >
                    <Button  secondary icon='info' content='Info Page' />
                  </Link>


                  <Link to ={`/stories/${story.id}`} >
                    <Button primary icon='book' content='Read This Story' />
                  </Link>


                </Segment>
              )}
              {this.props.reddit &&
                <Button onClick={this.props.loadMore} primary fluid> Load More Stories </Button>
              }
            </Segment>
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default DesktopIndex
