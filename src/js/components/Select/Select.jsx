import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const customStyles = {
  menu: () => {
    const position = 'absolute';
    const background = '#ffffff';
    const width = '100%';
    const marginTop = '10px';
    const boxShadow = '0px 3px 9px rgba(0, 0, 0, 0.16)';
    const padding = '5px 0';
    const borderRadius = '5px';
    const border = '1px solid rgba(80, 97, 131, 0.5)';
    const zIndex = '999999';

    return {
      position,
      boxShadow,
      width,
      background,
      marginTop,
      padding,
      borderRadius,
      border,
      zIndex,
    };
  },
};

const Dropdown = (props) => {
  const getDefaultValue = useCallback(() => {
    let { defaultValue } = props;

    if (props.isMulti) {
      const fixedOptions = [];
      props.options.forEach((option) => {
        if (option.isFixed) {
          fixedOptions.push(option.value);
        }
      });

      defaultValue = [
        ...fixedOptions,
        ...(defaultValue
          ? defaultValue.filter((value) => {
              return !fixedOptions.includes(value);
            })
          : []),
      ];
    }

    if (
      defaultValue === null ||
      defaultValue === undefined ||
      defaultValue.length === 0
    ) {
      defaultValue = null;
    }

    return defaultValue;
  }, [props]);

  const getValue = useCallback(
    (selection) => {
      let hasDefaultInOptions = false;
      if (selection !== undefined && selection !== null) {
        if (typeof selection === 'object') {
          hasDefaultInOptions = selection.some((item) => {
            return props.options.find((option) => {
              return option.value === item;
            });
          });
        } else {
          hasDefaultInOptions = props.options.find((option) => {
            return option.value === selection;
          });
        }
      }

      if (!hasDefaultInOptions) {
        return null;
      }

      if (typeof selection === 'object') {
        return selection.map((item) => {
          return {
            ...props.options.find((option) => {
              return option.value === item;
            }),
            value: item,
          };
        });
      }
      if (selection !== undefined && selection !== null) {
        return {
          ...props.options.find((option) => {
            return option.value === selection;
          }),
          value: selection,
        };
      }

      return null;
    },
    [props.options],
  );

  const onChange = React.useRef(props.onChange);

  const [value, setValue] = React.useState(() => {
    if (props.options) {
      return getDefaultValue();
    }
    return null;
  });

  const [error, setError] = React.useState('');

  React.useEffect(() => {
    onChange.current(value);
  }, [onChange, value]);

  const handleChange = (selection, { action, removedValue }) => {
    if (
      (action === 'remove-value' || action === 'pop-value') &&
      removedValue.isFixed
    ) {
      return;
    }

    if (action === 'clear') {
      const clearedSelection = props.options
        .filter((option) => {
          return option.isFixed;
        })
        .map((option) => {
          return option.value;
        });

      if (clearedSelection && clearedSelection.length > 0) {
        setValue(() => {
          return getValue(clearedSelection);
        });
      } else {
        setValue(() => {
          return getValue(null);
        });
      }
      return;
    }

    if (!selection) {
      setValue(() => {
        return getValue(null);
      });
      return;
    }

    if (selection.length) {
      setValue(() => {
        return getValue(
          selection.map((item) => {
            return item.value;
          }),
        );
      });
    } else {
      setValue(() => {
        return getValue(selection.value);
      });
    }
  };

  return (
    <div className="Dropdown">
      {props.label && (
        <label className="Dropdown-label" htmlFor={props.name}>
          {props.label}
        </label>
      )}
      {props.options && props.options.length > 0 && (
        <ReactSelect
          noOptionsMessage={() => {
            return 'Not avaliable...';
          }}
          placeholder="Please..."
          className="Dropdown-input"
          classNamePrefix="Dropdown"
          formatGroupLabel="Ok"
          {...props}
          styles={customStyles}
          onChange={handleChange}
          value={value}
        />
      )}

      {error ? <span className="Dropdown-error">{error}</span> : null}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    ),
  ]),
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
    }).isRequired,
  ),
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  onChange: PropTypes.func,
  onInitialized: PropTypes.func,
};

Dropdown.defaultProps = {
  label: '',
  placeholder: '',
  options: null,
  defaultValue: null,
  isDisabled: false,
  isMulti: false,
  isClearable: false,
  isSearchable: false,
  onChange: () => {
    return null;
  },
  onInitialized: () => {
    return null;
  },
};

export default Dropdown;
