import React from 'react'
import Settings from '../../lib/Settings'
import { Container, Checkbox, Segment, Header, Divider, Grid } from 'semantic-ui-react'

class SettingsPage extends React.Component{
  constructor(){
    super()
    this.state ={
      nightMode: Settings.isNightMode()
    }
    this.toggleNightMode = this.toggleNightMode.bind(this)
  }


  toggleNightMode(){
    const nightMode = this.state.nightMode
    Settings.setNightMode(!nightMode)
    this.setState({ nightMode: !this.state.nightMode })
    window.location.reload()
  }



  render(){
    const { nightMode }= this.state
    return(
      <Container>
        <Divider hidden section />
        <Segment inverted={nightMode}>
          <Grid columns={2}>
            <Grid.Column width={12}>
              <Header inverted={nightMode}> Night Mode </Header>
              <Header inverted={nightMode}> Text-to-speech </Header>
            </Grid.Column>

            <Grid.Column width={4}>
              <Checkbox onChange={this.toggleNightMode} toggle checked={nightMode}/>
              <Divider />
              <Checkbox toggle checked />
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

export default SettingsPage
