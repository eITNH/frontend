import loadable from '@loadable/component';

import './LoggedInArea.css';

export default loadable(() => {
  return import('./LoggedInArea.jsx');
});
