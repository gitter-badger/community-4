import React from 'react/lib/React';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import BaseComponent from '../common/BaseComponent';

class ErrorView extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('sendFeedback');
    this.state = {
      feedback: false,
    };
  }

  sendFeedback() {
    this.setState({ feedback: true });
  }

  render() {
    let displayElement = (
      <Button bsStyle="danger" onClick={this.sendFeedback}>Send crash report</Button>
    );
    if (this.state.feedback) {
      displayElement = (
        <Button disabled bsStyle="info" onClick={this.sendFeedback}>
          Thank you <Glyphicon glyph="heart" />
        </Button>
      );
    }
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <div style={{
          textAlign: 'center',
          margin: '0 auto',
          position: 'relative', top: '50%',
          transform: 'translateY(-50%)' }}
        >
          <Image src="/images/error.png" responsive style={{ margin: '0 auto' }} />
          <h2>Holy guacamole! Something bad happened.</h2>
          <div style={{ paddingBottom: '15px' }}>
            An error occured in the application. Please try again later.
          </div>
          {displayElement}
        </div>
      </div>
    );
  }
}

export default ErrorView;
