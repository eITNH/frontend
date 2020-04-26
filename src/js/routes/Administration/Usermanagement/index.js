import loadable from '@loadable/component';

import './Usermanagement.css';

export default loadable(() => {
  return import('./Usermanagement.jsx');
});
