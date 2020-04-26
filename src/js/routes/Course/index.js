import loadable from '@loadable/component';

import './Course.css';

export default loadable(() => {
  return import('./Course.jsx');
});
