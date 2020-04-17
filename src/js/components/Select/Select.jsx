import React from 'react';
import ReactSelect from 'react-select';

import MenuList from './List.jsx';

const Select = (props) => {
  const [selection, setSelection] = React.useState(null);

  const setSelectedValue = (sel) => {
    setSelection(() => {
      return sel;
    });
  };

  return (
    <ReactSelect
      value={selection}
      onChange={setSelectedValue}
      components={{ MenuList }}
      {...props}
    />
  );
};

export default Select;
