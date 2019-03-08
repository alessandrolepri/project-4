import React from 'react'
import { Segment, Divider, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import FlipPage from 'react-flip-page'
import Settings from '../../lib/Settings'


const style = {
  width: '100%'
}

class Reader extends React.Component{

  constructor(props){
    super(props)

    this.state={
      nightMode: Settings.isNightMode(),
      width: window.innerWidth
    }
  }

  modifyStory(){
    const newStory = []
    let base = 0
    if(this.state.width > 500){
      const storySentences = this.props.story.content.split('.')
      for(let i = 10; i < storySentences.length+9; i+=10){
        newStory.push(storySentences.slice(base,i).join('.'))
        base +=10
      }
    } else {
      const storySentences = this.props.story.content.split('')
      for(let i = 750; i < storySentences.length+749; i+=750){
        newStory.push(storySentences.slice(base,i).join(''))
        base +=750
      }
    }
    if (newStory.length === 0) return [this.props.story.content]
    return newStory
  }

  componentDidMount(){
    this.setState({ newStory: this.modifyStory() })
  }

  render(){
    const { nightMode } = this.state
    if(!this.state.newStory)return null
    if(this.state.width < 500)return(
      <div id='flippertwo'>
        <FlipPage
          showSwipeHint
          orientation='horizontal'
          responsive
          style={{ touchAction: 'none' }}
        >
          {this.state.newStory.map((storyPart, index) =>
            <Segment id='reader-segment' inverted={nightMode} style={style} key={index} textAlign='center'>
              <Header as='h4'> Page {index+1}  </Header>
              <Link to={`info/${this.props.story.id}`}> View Info </Link>
              <Divider />
              <p className='content-text'> {`${storyPart}`} </p>
              <Divider hidden section />
              <Divider hidden section />
              <Divider hidden section />
              <Divider hidden section />
              <Divider hidden section />
            </Segment>
          )}
        </FlipPage>
      </div>
    )
    if(this.state.width > 500)return(
      <div>
        <Segment inverted={nightMode} style={style}  id='reader' textAlign='center'>
          <Header as='h2'> {this.props.story.title}</Header>
          <Link to={`info/${this.props.story.id}`}> Info </Link>
          <Divider />
          {this.state.newStory.map((storyPart, index) =>
            <p key={index} className='desktop-content-text'> {storyPart} </p>
          )}
          <Divider hidden />
        </Segment>
      </div>
    )
  }
}

export default Reader
