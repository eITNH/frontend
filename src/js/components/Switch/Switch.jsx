import PropTypes from 'prop-types';
import React from 'react';

const Switch = (props) => {
  const inputRef = React.useRef(null);

  const handleChange = () => {
    const { checked } = inputRef.current;
    if (props.onChange) {
      props.onChange(checked);
    }
  };

  return (
    <div className="Switch">
      <div className="Switch-title">
        {props.label}
        <div className="Switch-description">{props.description}</div>
      </div>
      <label
        className="Switch-label"
        htmlFor={props.name}
        style={{ marginTop: props.description && '10px' }}
      >
        <input
          ref={inputRef}
          type="checkbox"
          id={props.name}
          name={props.name}
          defaultChecked={props.defaultChecked}
          onChange={handleChange}
          className="Switch-input"
        />
        <span className="Switch-switch" />
      </label>
    </div>
  );
};

Switch.propTypes = {
  defaultChecked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  defaultChecked: false,
  description: '',
  onChange: () => {
    return null;
  },
};

export default Switch;
