import React from 'react'
import StoryForm from './StoryForm'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Flash from '../../lib/Flash'
import SuccessModal from '../common/SuccessModal'

const headers = { headers: { Authorization: `Bearer ${Auth.getToken()}` } }

// component will make axios request based on whether or not url is stories/new or stories/edit/storyid

class StoriesNewEdit extends React.Component{
  constructor(props){
    super(props)

    this.state={
      saved: false,
      errors: true,
      isNew: (this.props.match.path === '/stories/new'),
      storyData: {
        title: '',
        description: '',
        content: '',
        genre: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSaveDraft = this.handleSaveDraft.bind(this)
  }


  // handle the changing of form data
  handleChange({ target: { name, value }}) {
    const storyData = {...this.state.storyData, [name]: value }
    const errors= {}
    this.setState({ storyData, errors })
  }

  handleSaveDraft(e){
    e.preventDefault()
    if(this.state.isNew) this.handleSubmitOrSave(true, 'save').then(() => {
      this.setState({ saved: true })
    })
    else this.handleSubmitOrSave(false)
      .then(() => this.props.history.push(`${this.props.match.params.id}`))
    Flash.setMessage('success', 'Story Successfully Saved' )
  }

  // determine which axios request to make
  async handleSubmitOrSave(isNew, type){
    if(isNew && type === 'submit') return await axios.post('/api/stories', {...this.state.storyData}, headers)
    if(isNew && type === 'save') return await axios.post('/api/stories', {...this.state.storyData, finished: false}, headers)
    if(!isNew) return await axios.put(`/api/stories/${this.props.match.params.id}`, this.state.storyData, headers )
  }

  // submit the form data
  handleSubmit(e){
    e.preventDefault()
    if(this.state.isNew) this.handleSubmitOrSave(true, 'submit').then(() => this.props.history.push('/stories'))
    else this.handleSubmitOrSave(false).then(() => this.props.history.push('/stories'))
    Flash.setMessage('success', 'Story Successfully Updated' )
  }


  // keeps state the same if on stories new page, otherwise get story data to populate the form
  getStoryData(isNew){
    if(isNew) return null
    else {
      axios.get(`/api/stories/${this.props.match.params.id}`)
        .then(res => this.setState({
          storyData: {
            title: res.data.title,
            content: res.data.content,
            description: res.data.description,
            genre: res.data.genre
          }
        })
        )
    }
  }


  componentDidMount(){
    this.getStoryData(this.state.isNew)
  }

  render(){
    return(
      <div>
        <StoryForm
          storyData={this.state.storyData}
          handleSaveDraft={this.handleSaveDraft}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <SuccessModal saved={this.state.saved} />
      </div>
    )
  }
}

export default StoriesNewEdit
