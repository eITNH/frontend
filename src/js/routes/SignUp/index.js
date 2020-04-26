import loadable from '@loadable/component';

import './SignUp.css';

export default loadable(() => {
  return import('./SignUp.jsx');
});
