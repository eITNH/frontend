import 'react-dates/initialize';
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import 'react-dates/lib/css/_datepicker.css';
import validate from '../../logic/validator';

const DatePicker = ({
  onChange,
  validator,
  label,
  name,
  defaultValue,
  ...props
}) => {
  const [date, setDate] = useState(() => {
    return defaultValue ? moment(defaultValue) : null;
  });
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const handleChange = useCallback(onChange, [date]);

  useEffect(() => {
    if (validator) {
      const validateField = validate(date, validator);
      if (!validateField.isValid) {
        setError(validateField.error);
      } else {
        setError('');
      }
    }

    handleChange(date);
  }, [date, handleChange, validator]);

  return (
    <label htmlFor={name}>
      {label}
      {error}
      <SingleDatePicker
        date={date}
        onDateChange={(value) => {
          setDate(value);
        }}
        focused={focused}
        onFocusChange={({ focused: value }) => {
          setFocused(value);
        }}
        displayFormat="DD.MM.YYYY"
        // withPortal
        numberOfMonths={1}
        id={name}
        block
        noBorder
        hideKeyboardShortcutsPanel
        {...props}
      />
    </label>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  validator: PropTypes.arrayOf(
    PropTypes.shape({
      required: PropTypes.bool,
      error: PropTypes.string.isRequired,
    }),
  ),
};

DatePicker.defaultProps = {
  defaultValue: '',
  placeholder: '',
  onChange: () => {
    return null;
  },
  validator: null,
};

export default DatePicker;
