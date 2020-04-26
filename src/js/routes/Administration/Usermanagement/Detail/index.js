import loadable from '@loadable/component';

import './Detail.css';

export default loadable(() => {
  return import('./Detail.jsx');
});
