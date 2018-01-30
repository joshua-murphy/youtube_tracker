import React from 'react';
import SubModal from './SubModal';
import { Icon, Modal, Popup } from 'semantic-ui-react';

class AddSub extends React.Component {
  state = { modalOpen: false };

  toggleModal = (e) => {
    const { modalOpen } = this.state
    this.setState({ modalOpen: !modalOpen })
  }

  render(){
    const { modalOpen } = this.state;
    return(
      <Modal
        open={ modalOpen }
        onClose={ this.toggleModal }
        trigger={
          <Popup basic content="Add Subscription" trigger={
            <Icon 
              link 
              size="large" 
              name='add' 
              onClick={this.toggleModal}/> 
            }
          />
        }
      >
        <SubModal 
          toggleModal={this.toggleModal}
        />
      </Modal>
    );
  }
}

export default AddSub;