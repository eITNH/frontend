import loadable from '@loadable/component';

import './Login.css';

export default loadable(() => {
  return import('./Login.jsx');
});
