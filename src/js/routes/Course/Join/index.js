import loadable from '@loadable/component';

import './CourseJoin.css';

export default loadable(() => {
  return import('./CourseJoin.jsx');
});
