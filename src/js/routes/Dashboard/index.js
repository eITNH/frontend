import loadable from '@loadable/component';

import './Dashboard.css';

export default loadable(() => {
  return import('./Dashboard.jsx');
});
