import PropTypes from 'prop-types';
import React from 'react';
import validate from '../../logic/validator';

const Input = (props) => {
  const [focused, setFocused] = React.useState(false);
  const [error, setError] = React.useState('');
  const inputRef = React.useRef(null);

  const handleFocus = () => {
    setFocused(() => {
      return true;
    });
  };

  const handleBlur = () => {
    if (inputRef.current.value === '') {
      setFocused(() => {
        return false;
      });
    }
  };

  const handleChange = (e) => {
    const { value } = inputRef.current;
    if (props.validator) {
      const validateField = validate(value, props.validator);
      if (!validateField.isValid) {
        setError(() => {
          return validateField.error;
        });
      } else {
        setError(() => {
          return '';
        });
      }
    }

    if (props.onChange) {
      props.onChange(value, e);
    }
  };

  const { validator: _validator, ...rest } = props;

  if (props.type === 'text' || props.type === 'password') {
    return (
      <div
        className={`
          Input
          ${focused ? 'is-active' : ''}
          ${error !== '' ? 'is-invalid' : ''}
        `}
      >
        <label htmlFor={props.name}>
          {props.label}
          <input
            {...rest}
            className={`
              Input-field
              ${focused ? 'is-active' : ''}
            `}
            id={props.name}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={handleChange}
            ref={inputRef}
          />
        </label>
        {error ? <span className="Input-error">{error}</span> : null}
      </div>
    );
  }

  if (props.type === 'textarea') {
    return (
      <div
        className={`
          Input
          ${focused ? 'is-active' : ''}
          ${error !== '' ? 'is-invalid' : ''}
        `}
      >
        <label htmlFor={props.name}>
          {props.label}
          <textarea
            {...rest}
            className={`
              Input-field
              ${focused ? 'is-active' : ''}
            `}
            id={props.name}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={handleChange}
            ref={inputRef}
          />
        </label>
        {error ? <span className="Input-error">{error}</span> : null}
      </div>
    );
  }
  return null;
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'textarea']),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validator: PropTypes.arrayOf(
    PropTypes.shape({
      required: PropTypes.bool,
      error: PropTypes.string.isRequired,
    }),
  ),
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  value: undefined,
  defaultValue: undefined,
  validator: undefined,
  onChange: () => {
    return null;
  },
};

export default Input;
