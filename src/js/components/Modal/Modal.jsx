import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

let currentModal = false;
export function closeCurrentModal() {
  if (currentModal) {
    currentModal.onClose();
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.portal = document.createElement('div');
    this.portal.className = `Modal-wrapper ${
      this.props.open ? ' is-active' : ''
    }`;
  }

  componentDidMount() {
    document.body.appendChild(this.portal);
  }

  componentWillUnmount() {
    document.body.removeChild(this.portal);
  }

  onClose = () => {
    this.props.onClose();
  };

  render() {
    if (!this.props.open) {
      this.portal.className = 'Modal-wrapper';
      currentModal = false;
      return null;
    }

    this.portal.className = 'Modal-wrapper is-active';
    currentModal = this;
    return ReactDOM.createPortal(
      <div className="Modal">
        {this.props.onClose && typeof this.props.onClose === 'function' && (
          <button type="button" className="Modal-close" onClick={this.onClose}>
            close window
          </button>
        )}
        <div className="Modal-content">{this.props.children}</div>
      </div>,
      this.portal,
    );
  }
}

Modal.defaultProps = {
  open: false,
  onClose: null,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default Modal;
