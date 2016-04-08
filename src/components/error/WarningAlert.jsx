import React from 'react/lib/React';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';

import BaseComponent from '../common/BaseComponent';

class WarningAlert extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('handleAlertDismiss');
    this.state = {
      visible: true,
    };
  }

  handleAlertDismiss() {
    this.setState({ visible: false });
  }

  render() {
    if (this.state.visible) {
      return (
        <div style={{ height: '13%', width: '100%' }}>
          <div style={{
            textAlign: 'center',
            margin: '0 auto',
            position: 'relative', top: '50%',
            transform: 'translateY(-50%)' }}
          >
          <Alert bsStyle="warning" onDismiss={this.handleAlertDismiss}>
            <h4>Something unexpected happened...</h4>
            <div style={{ paddingBottom: '15px' }}>
              {this.props.message}
            </div>
            <Button bsStyle="warning" onClick={this.handleAlertDismiss}>I got it</Button>
          </Alert>
          </div>
        </div>
      );
    }
    return (false);
  }
}

export default WarningAlert;
