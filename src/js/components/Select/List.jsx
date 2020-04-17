import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';

const height = 35;

const MenuList = (props) => {
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => { return <div style={style}>{children[index]}</div>; }}
    </List>
  );
};

MenuList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  maxHeight: PropTypes.number.isRequired,
  getValue: PropTypes.func.isRequired,
};

export default MenuList;
