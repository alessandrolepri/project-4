import React from 'react'
import { Header, Modal, Button, Icon } from 'semantic-ui-react'

class SuccessModal extends React.Component{

  constructor(props){
    super(props)

    this.state={
      finished: false
    }
    this.changeFinished = this.changeFinished.bind(this)
  }

  changeFinished(){
    this.setState({ finished: true })
  }


  render(){
    return(
      <div>
        {!this.state.finished &&
          <Modal open={this.props.saved} basic size='small'>
            <Header icon='checkmark' content='Saved Successfully!' />
            <Modal.Actions>
              <Button onClick={this.changeFinished} color='green' inverted>
                <Icon name='checkmark' /> Ok
              </Button>
            </Modal.Actions>
          </Modal>
        }
      </div>
    )
  }
}


export default SuccessModal
