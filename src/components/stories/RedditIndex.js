import React from 'react'
import FlipPage from 'react-flip-page'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../common/LoadingPage'
import { Segment, Header, Divider, Container, Button, Grid } from 'semantic-ui-react'
import DesktopIndex from './DesktopIndex'
import IndexFlipper from './IndexFlipper'
import Auth from '../../lib/Auth'

const headers = {headers: { Authorization: Auth.getToken() }}


const style = {
  width: '100%',
  height: '100vh',
  backgroundImage: 'url(https://i.imgur.com/n2Ks2yS.jpg)',
  backgroundSize: 'cover'
}


class StoriesIndex extends React.Component{
  constructor(props){
    super(props)

    this.state={
      count: 20,
      reddit: true,
      width: window.innerWidth,
      stories: []
    }

    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.addToReadList = this.addToReadList.bind(this)
  }

  addToReadList(e, story){
    if(Auth.isAuthenticated()){
      axios.post(`/api/reddit/save/${story.id}`, {data: 'ok'}, headers)
        .then(res => console.log(res))
    }
  }

  loadMore(){
    axios.get(`/api/reddit/count/${this.state.count}`)
      .then(stories => {
        this.setState({ stories: stories.data, count: this.state.count + 10 })
      })
  }


  // bringing in all the stories
  componentDidMount(){
    window.addEventListener('resize', this.handleWindowSizeChange)
    axios.get(`/api/reddit/count/10`)
      .then(stories => {
        this.setState({ stories: stories.data })
      })
  }

  // checking if window size changes
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  // telling state size of window
  handleWindowSizeChange(){
    this.setState({ width: window.innerWidth })
  }



  render(){
    if(this.state.stories.length < 1) return <LoadingPage />
    console.log(this.state)
    const { width } = this.state
    const isMobile = width <= 500
    if(isMobile){
      return(
        <IndexFlipper
          style={style}
          stories={this.state.stories}
          reddit={this.state.reddit}
          addToReadList={this.addToReadList}
          loadMore={this.loadMore}
        />
      )
    } else return(
      <div>
        <Divider />
        <DesktopIndex
          addToReadList={this.addToReadList}
          loadMore={this.loadMore}
          reddit={this.state.reddit}
          stories={this.state.stories}
        />
      </div>
    )
  }
}

export default StoriesIndex
